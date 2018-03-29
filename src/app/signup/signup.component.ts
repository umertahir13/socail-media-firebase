import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FirebaseService} from '../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private firebaseService: FirebaseService,
              private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    const userData = {
      fname: form.value.fname,
      lname: form.value.lname,
      email: form.value.email,
      password: form.value.pass,
      pass1: form.value.Cpass,
      city: form.value.city,
      country: form.value.country,
      zip: form.value.zip
    };
    console.log(userData);
   if (userData.password === userData.pass1) {
      this.firebaseService.addUser(userData);
      this.router.navigate(['/']);
   } else {
     alert('Password does not matched!\n Please enter again.');
     form.reset();
   }
  }

}
