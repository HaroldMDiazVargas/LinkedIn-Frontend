import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { getLoading } from './shared/store/selector';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, LoadingSpinnerComponent, CommonModule],
})
export class AppComponent implements OnInit{
  showLoading!: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) {}
  
  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading)
  }
}
