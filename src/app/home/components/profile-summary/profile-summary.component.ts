import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { take } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Role } from 'src/app/auth/models';


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
  bannerColors: BannerColors = {
    colorOne: '#a0b4b7',
    colorTwo: '#dbe7e9',
    colorThree: '#bfd3d6',
  };

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
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

  }

}
