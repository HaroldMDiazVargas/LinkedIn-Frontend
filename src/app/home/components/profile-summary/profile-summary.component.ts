import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { from, switchMap, take, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Role } from 'src/app/auth/models';
import { FormControl, FormGroup } from '@angular/forms';
import { fromBuffer } from 'file-type/core';
import { FileTypeResult } from 'file-type';

type validFileExtension = 'png' | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

type BannerColors = {
  colorOne: string;
  colorTwo: string;
  colorThree: string;
}

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss'],
  standalone: true,
  imports: [IonicModule]
})

export class ProfileSummaryComponent  implements OnInit {
  form!: FormGroup;

  validFileExtensions: validFileExtension[] = ['png', 'jpg', 'jpeg'];
  validMimeTypes: validMimeType[] = ['image/png', 'image/jpg', 'image/jpeg'];

  bannerColors: BannerColors = {
    colorOne: '#a0b4b7',
    colorTwo: '#dbe7e9',
    colorThree: '#bfd3d6',
  };

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      file: new FormControl(null)
    })

    this.auth.userRole.subscribe({
      next: ((role: Role) => {
        this.bannerColors = this.getBannerColors(role);
      })
    })
  }
  
  private getBannerColors(role: Role): BannerColors{
    switch (role) {
      case 'admin':
        return {
          colorOne: '#daa520',
          colorTwo: '#f0e68c',
          colorThree: '#fafad2',
        }
        case 'premium':
          return {
            colorOne: '#bc8f8f',
            colorTwo: '#c09999',
            colorThree: '#ddadaf',
          }        
    
      default:
        return this.bannerColors;
    }

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
