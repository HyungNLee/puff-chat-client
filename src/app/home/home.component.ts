import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers : [ChatService, AuthenticationService]
})
export class HomeComponent implements OnInit {

  startChat: boolean = false;

  constructor(private chatService : ChatService, public authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login(email, password) {
    this.authService.login(email, password);
    if (confirm('Successfully logged in')) {
      this.router.navigate(["chat"]);
    }

    
  }

  logout() {
    this.authService.logout();
    
    if (confirm('Successfully logged out')) {
      this.router.navigate([""]);
    }
  }

  updateDisplayName(newName) {
    this.authService.updateDisplayName(newName);
  }

  createAccount(newEmail, newPW) {
    this.authService.createAccount(newEmail, newPW);
    if (confirm('Successfully signed up')) {
      this.router.navigate([""]);
    } 
  }

  startChatting() {
    this.startChat = true;
  }

}
