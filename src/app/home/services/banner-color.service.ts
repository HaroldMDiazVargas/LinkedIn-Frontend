import { Injectable } from '@angular/core';
import { Observable, from, of, switchMap, take } from 'rxjs';
import { Role } from 'src/app/auth/models';
import { AuthService } from 'src/app/auth/services/auth.service';


export type BannerColors = {
  colorOne: string;
  colorTwo: string;
  colorThree: string;
}


@Injectable({
  providedIn: 'root'
})
export class BannerColorService {

  constructor(
    private authService: AuthService
  ) { }
  
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
        return {
          colorOne: '#a0b4b7',
          colorTwo: '#dbe7e9',
          colorThree: '#bfd3d6',
        }
    }
  }

  get bannerColors(): Observable<BannerColors>{
    return this.authService.userRole.pipe(
      take(1),
      switchMap((role: Role) => {
        return of(this.getBannerColors(role))
      })
    )
  }

}
