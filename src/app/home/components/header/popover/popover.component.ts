import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class PopoverComponent  implements OnInit, OnDestroy {

  private userImagePathsubscription!: Subscription;
  userFullImagePath: string = '';
  userFullName: string = '';
  
  constructor(
    private authService: AuthService
  ) { }
  
  ngOnInit() {
    this.userImagePathsubscription = this.authService.userFullImagePath.subscribe((fullImagePath: string) => this.userFullImagePath = fullImagePath )
    this.authService.userFullName.pipe(take(1)).subscribe((userFullName: string) => this.userFullName = userFullName);
  }

  ngOnDestroy(): void {
    this.userImagePathsubscription.unsubscribe();
  }
  
  logout(){
    return this.authService.logout().subscribe();
  }

}
