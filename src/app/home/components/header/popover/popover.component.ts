import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class PopoverComponent  implements OnInit {

  constructor(
    private auth: AuthService
  ) { }
  
  ngOnInit() {}

  logout(){
    return this.auth.logout().subscribe();
  }

}
