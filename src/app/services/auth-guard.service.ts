import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {FirebaseService} from './firebase.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router, private firebaseService: FirebaseService, private authService: AngularFireAuth) { }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.firebaseService.isAuthenticated().then(
      (authenticated: boolean) => {
        if (authenticated) {
          return true;
        } else {
          this.router.navigate(['/']);
        }
      });
  }
  canActivateChild (route: ActivatedRouteSnapshot,
                    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
