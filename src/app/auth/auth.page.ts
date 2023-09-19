import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){}

  toggleText(){
    this.submissionType = this.submissionType === 'login' ? 'join' : 'login';
  }

}
