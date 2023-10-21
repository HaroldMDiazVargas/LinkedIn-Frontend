import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class PopoverComponent  implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  userFullImagePath: string = '';
  userFullName: string = '';
  
  constructor(
    private authService: AuthService
  ) { }
  
  ngOnInit() {
    this.subscriptions.push(this.authService.userFullName.subscribe((userFullName: string) => this.userFullName = userFullName));
    this.subscriptions.push(this.authService.userFullImagePath.subscribe((fullImagePath: string) => this.userFullImagePath = fullImagePath));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  logout(){
    return this.authService.logout().subscribe();
  }

}
