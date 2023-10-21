import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverComponent } from './popover/popover.component';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [PopoverComponent, IonicModule]
})
export class HeaderComponent  implements OnInit, OnDestroy {
  
  private userImagePathsubscription!: Subscription;
  userFullImagePath: string = '';
  
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.userImagePathsubscription = this.authService.userFullImagePath.subscribe((fullImagePath: string) => this.userFullImagePath = fullImagePath )
  }

  ngOnDestroy(): void {
    this.userImagePathsubscription.unsubscribe();
  }
}
