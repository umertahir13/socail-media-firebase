import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuth} from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { LogingComponent } from './loging/loging.component';
import { HomeComponent } from './home/home.component';
import { HomeBodyComponent } from './home/home-body/home-body.component';
import { PostsComponent } from './home/posts/posts.component';
import {environment} from '../environments/environment';
import { AboutComponent } from './home/about/about.component';
import {FirebaseService} from './services/firebase.service';
import {AuthGuardService} from './services/auth-guard.service';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  {path: '', component: LogingComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent, canActivateChild: [AuthGuardService],
    canActivate: [AuthGuardService],
  children: [
    {path: 'homebody', component: HomeBodyComponent},
    {path: 'posts', component: PostsComponent},
    {path: 'about', component: AboutComponent}
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    LogingComponent,
    HomeComponent,
    HomeBodyComponent,
    PostsComponent,
    AboutComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase)


  ],
  providers: [FirebaseService, AuthGuardService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
