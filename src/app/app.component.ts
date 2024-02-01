import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Observable, combineLatest } from 'rxjs';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { getErrorMessage, getLoading } from './shared/store/selector';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { PopupNotificationComponent } from './shared/components/popup-notification/popup-notification.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, LoadingSpinnerComponent, CommonModule, PopupNotificationComponent],
})
export class AppComponent implements OnInit{
  showLoading!: Observable<boolean>;
  errorMessage!: Observable<string>; 
  // data$ = combineLatest({   //Resolve every single stream with the value
  //   showLoading: this.store.select(getLoading),
  //   errorMessage: this.store.select(getErrorMessage),
  // });

  
  constructor(
    private store: Store<AppState>
  ) {}
  
  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
    this.errorMessage = this.store.select(getErrorMessage)
  }
}
