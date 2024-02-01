import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
// import { register } from './store/actions';
import { authActions } from './store/actions';
import { ILogin, ISignup } from './models';
import { selectIsSubmitting, selectSubmissionType, selectValidationErrors } from './store/reducers';
import { Subscription, combineLatest } from 'rxjs';
// import { selectIsSubmitting } from './store/selectors';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: []
})
export class AuthPage implements OnInit, OnDestroy {

  @ViewChild('f') form!: NgForm;

  submissionType!: 'login' | 'join';
  // isSubmitting$ = this.store.select(selectIsSubmitting)
  data$ = combineLatest({   //Resolve every single stream with the value
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
    submissionType: this.store.select(selectSubmissionType)
  });
  private submissionTypeSubscription!: Subscription;
  // submissionType$ = this.store.select(selectSubmissionType)

  constructor(
    private auth: AuthService,
    private router: Router,
    // private store: Store<{ auth: IAuthState}>
    private store: Store
  ) { }

  ngOnInit() {
    // this.submissionTypeSubscription = this.store.select(selectSubmissionType).subscribe((type) => {
    //   this.submissionType = type ?? 'join';
    // })
  }

  ngOnDestroy(): void {
    // this.submissionTypeSubscription.unsubscribe();
  }

  onSubmit(submissionType: 'join' | 'login'){
    const { email, password } = this.form.value;

    console.log({submissionType})
    if (submissionType === 'login'){
      if (!email || !password) return;
      const loginData: ILogin = {
        email,
        password
      }
      return this.store.dispatch(authActions.login({ request: loginData }));
      // return this.auth.login({
      //   email,
      //   password
      // }).subscribe({
      //   next: (result) => {
      //     this.router.navigate(['/private'])
      //   }
      // })
    }
    else {
      const { firstName, lastName } = this.form.value;
      const signupData: ISignup = {
        firstName,
        lastName,
        email,
        password
      }
      return this.store.dispatch(authActions.register({ request: signupData }));
      // return this.auth.register({
      //   firstName,
      //   lastName,
      //   email,
      //   password
      // }).subscribe({
      //   next: (result) => {
      //     this.toggleText();
      //   },
      //   error: (e) => {
      //     console.log(e)
      //   }
      // })
    }
  }

  toggleText(){
    // this.submissionType = this.submissionType === 'login' ? 'join' : 'login';
    this.store.dispatch(authActions.changeSubmissionType({submissionType: null }));
  }

}
