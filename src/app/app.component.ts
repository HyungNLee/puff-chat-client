import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent {
  title = 'puff-chat';

  // user;
  // userName: string;

  constructor(public authService: AuthenticationService, private router: Router) {
    this.authService.user.subscribe(user => {
      if (user != null) {
        this.router.navigate(['/chat']);
      }
    });
  }

  // ngDoCheck() {
  //   this.user = firebase.auth().currentUser;
  //   if (this.user == null) {
        
  //   } else {
  //     this.userName = this.user.displayName;
  //   }
  // }

  // login(email, password) {
  //   this.authService.login(email, password);
  // }

  // logout() {
  //   this.authService.logout();
  // }

  // updateDisplayName(newName) {
  //   this.authService.updateDisplayName(newName);
  // }
}
