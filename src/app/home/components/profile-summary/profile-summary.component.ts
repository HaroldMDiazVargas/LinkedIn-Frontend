import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { from, switchMap, take, of, BehaviorSubject, Subscription, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Role } from 'src/app/auth/models';
import { FormControl, FormGroup } from '@angular/forms';
import { fromBuffer } from 'file-type/core';
import { FileTypeResult } from 'file-type';
import { CommonModule } from '@angular/common';
import { BannerColorService, BannerColors } from '../../services/banner-color.service';

type validFileExtension = 'png' | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';


@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})

export class ProfileSummaryComponent  implements OnInit, OnDestroy {
  form!: FormGroup;

  validFileExtensions: validFileExtension[] = ['png', 'jpg', 'jpeg'];
  validMimeTypes: validMimeType[] = ['image/png', 'image/jpg', 'image/jpeg'];

  userFullName: string = '';
  userFullName$ = new BehaviorSubject<string>('')
  userFullImagePath: string = '';
  private userImagePathsubscription!: Subscription;
  // private subscriptions: Subscription[] = [];  //Do this to enable unsubscribe
  bannerColors: BannerColors = {} as BannerColors;

  constructor(
    private auth: AuthService,
    public bannerService: BannerColorService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      file: new FormControl(null)
    })

    this.auth.userRole.pipe(take(1)).subscribe((role: Role) => this.bannerColors =  this.bannerService.getBannerColors(role));
    this.auth.userFullName.pipe(take(1)).subscribe((userFullName: string) => {      //Take(1) because this name will not change until the next refresh
      this.userFullName = userFullName;
      this.userFullName$.next(userFullName);
    })
    this.userImagePathsubscription = this.auth.userFullImagePath.subscribe((fullImagePath: string) => this.userFullImagePath = fullImagePath );

  }

  ngOnDestroy(): void {
    this.userImagePathsubscription.unsubscribe();
    // this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  

  onFileSelect(event: Event): void{
    const file: File | undefined= (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const formData = new FormData();    //multipart/form-data
    formData.append('file', file);

    from(file.arrayBuffer())
      .pipe(
        switchMap((buffer: ArrayBuffer) => {
          return from(fromBuffer(buffer)).pipe(
            switchMap((fileTypeResult: FileTypeResult | undefined) => {
              if (!fileTypeResult) {
                //TODO: Error handling
                console.log({ error: 'file format not supported'});
                return of();
              }
              const { ext, mime } = fileTypeResult;
              if (
                !this.validFileExtensions.includes(ext as validFileExtension) ||
                !this.validMimeTypes.includes(mime as validMimeType))
                {
                  //TODO: Error handling
                  console.log({
                    error: 'file format does not match file extension!'
                  })
                  return of()
                }

              return this.auth.uploadUserImage(formData);
            })
          );
        })
      ).subscribe();

      this.form.reset();

  }

}
