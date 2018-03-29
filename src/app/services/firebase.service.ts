import { AngularFireDatabase } from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';


@Injectable()
export class FirebaseService {
  login = false;
  constructor(private firebase: AngularFireDatabase, private router: Router,
              private authService: AngularFireAuth) { }

  getData() {
   return this.firebase.list('/posts').valueChanges();
  }

  addData(post: object) {
    this.firebase.list('/posts').push(post);
  }

  isAuthenticated() {

   const promise = new Promise(resolve => {
     this.authService.auth.onAuthStateChanged(user => {
       if (user) {
         this.login = true;
         resolve(this.login);
       } else {
         this.login = false;
         resolve(this.login);
       }
     });
   });
    return promise;
  }

  check() {

  }
  onLogin(email, password) {
   this.authService.auth.signInWithEmailAndPassword(email, password)
     .then( () => {
        this.router.navigate(['home']);
    }).catch(err => {
      alert('Invalid Username and Password');
   });
  }
  logOut() {
   this.authService.auth.signOut();
   this.router.navigate(['/']);
  }

  addUser(userData) {
    const email = userData.email;
    const password = userData.password;
      this.authService.auth.createUserWithEmailAndPassword(email, password);
      this.firebase.list('/users').push(userData);
  }
}
