import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent implements OnInit {

  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
   const email = form.value.email;
   const pass = form.value.password;
   this.firebaseService.onLogin(email, pass);
  }

}
