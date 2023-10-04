import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AuthPage implements OnInit {

  @ViewChild('f') form!: NgForm;

  submissionType: 'login' | 'join' = 'login';

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    const { email, password } = this.form.value;

    if (this.submissionType === 'login'){
      if (!email || !password) return;
      return this.auth.login({
        email,
        password
      }).subscribe({
        next: (result) => {
          this.router.navigate(['/home'])
        }
      })
    }
    else {
      const { firstName, lastName } = this.form.value;
      return this.auth.register({
        firstName,
        lastName,
        email,
        password
      }).subscribe({
        next: (result) => {
          this.toggleText();
        },
        error: (e) => {
          console.log(e)
        }
      })
    }
  }

  toggleText(){
    this.submissionType = this.submissionType === 'login' ? 'join' : 'login';
  }

}
