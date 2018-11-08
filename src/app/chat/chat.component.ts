import { Component, OnInit, DoCheck } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthenticationService } from '../authentication.service';
import * as firebase from "firebase";
import { Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs-compat';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService, AuthenticationService]
})
export class ChatComponent implements OnInit, DoCheck {
  messages=[{username: "Ethan Lee", msg: "Hello, welcome to the chatroom", timestamp: Date.now(), uid: "default"}];
  msg : string;
  // currentUser: User;
  user;
  userName: string;
  userId: string;
  regex = /(THIS_IS_IMAGE)/i;
  chatroomList: any[] = [];
  selectedChatroom: string = "chatroom-0";
  getMessageSub: any;
  getPreviousMessagesSub: any;
  getChatroomListSub: any;


  emojiIconList: any[] = [
    { src: '../../assets/emoji/PuffChat Smiley.png', name: 'Smiley' },
    { src: '../../assets/emoji/PuffChat Smiley Wink.png', name: 'Wink' },
    { src: '../../assets/emoji/PuffChat Smiley Squint.png', name: 'Squint' },
    { src: '../../assets/emoji/PuffChat Smiley Squint Open.png', name: 'Squint Open' },
    { src: '../../assets/emoji/PuffChat Smiley Open.png', name: 'Smiley Open' },
    { src: '../../assets/emoji/PuffChat NongDamKi.png', name: 'NongDamKi!' },
    { src: '../../assets/emoji/PuffChat Frown.png', name: 'Frown' },
    { src: '../../assets/emoji/PuffChat Crying.png', name: 'Crying' },
    { src: '../../assets/emoji/PuffChat Blushing.png', name: 'Blushing' },
    { src: '../../assets/emoji/PuffChat Bemused.png', name: 'Bemused' },
    { src: '../../assets/emoji/PuffChat Kenneth.png', name: 'Kenneth' },
    { src: '../../assets/emoji/PuffChat Smirk.png', name: 'Smirk' },
    { src: '../../assets/emoji/PuffChat Shocked Emoticon.png', name: 'Shocked' }
  ];

  constructor(private chatService: ChatService, public authService: AuthenticationService, private router: Router) {
    this.authService.user.subscribe(user => {
      console.log(user);
      if (user == null) {
        this.router.navigate(['']);
      } else {
        this.userName = user.displayName;
        this.userId = user.uid;
      }
    });
  }

  ngDoCheck() {
    this.user = firebase.auth().currentUser;
    if (this.user == null) {

    } else {
      if (this.user.displayName) {
        this.userName = this.user.displayName;
        this.userId = this.user.uid;
        this.chatService.checkin(this.selectedChatroom, this.userName, this.user.uid);
      } else {
        this.userName = "Anonymous Puffster";
      }
    }
  }

  login(email, password) {
    this.authService.login(email, password);
  }

  logout() {
    this.authService.logout();
    if (confirm('Successfully logged out')) {
      this.router.navigate([""]);
    }
    location.reload();
  }

  updateDisplayName(newName) {
    if (newName) {
      this.chatService.updateUsername(this.selectedChatroom, this.user.uid, this.user.displayName, newName);
      this.authService.updateDisplayName(newName);
      this.messages = this.messages.map(message => {
        if (message.uid === this.user.uid) {
          message.username = newName;
        }
        return message;
      });
    } else {
      alert("Please enter a valid user name.");
    }

  }

  createAccount(newEmail, newPW) {
    this.authService.createAccount(newEmail, newPW);
  }

  ngOnInit() {
    this.getMessageSub = this.chatService
      .getMessage()
      .subscribe(msg => {
        if (msg.selectedChatroom === this.selectedChatroom) {
          this.messages.push({ username: msg.username, msg: msg.msg, timestamp: msg.timestamp, uid: (msg.uid === undefined) ? this.user.uid :msg.uid });
        }
        
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      });

    this.chatService.requestPreviousMessages(this.selectedChatroom);
    this.chatService.requestChatroomsList();

    this.getPreviousMessagesSub = this.chatService
      .getPreviousMessages()
      .subscribe(previousMessages => {
        Object.keys(previousMessages).forEach(key => {
          this.messages.push(previousMessages[key]);
        });
      });

    this.getChatroomListSub = this.chatService.getChatroomsList().subscribe(list => {
      this.chatroomList = list;
      this.chatroomList.forEach(chatroom => {
        this.chatService.getMemberCountRequest(chatroom.id);
      });
      this.chatService.getMemberCount().subscribe(msg => {
        this.chatroomList.find(function(chatroom) {
          return (chatroom.id === msg.chatroomId);
        }).memberCount = msg.memberCount;
      });
    });
  }

  sendMsg(msg) {
    if (msg) {
      this.chatService.sendMessage(this.userName, msg, this.selectedChatroom, this.user.uid);
    } else {
      alert("Please enter a valid message.");
    }
  }

  sendImg(url) {
    this.sendMsg(url + "THIS_IS_IMAGE");
    document.getElementById("img-dropdown-content").classList.toggle("hide");
  }

  preventDefault() {
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = '';
    })
  }

  changeChatroom(chatroomId) {
    this.selectedChatroom = chatroomId;
    this.getMessageSub.unsubscribe();
    this.getPreviousMessagesSub.unsubscribe();
    this.getChatroomListSub.unsubscribe();

    this.messages = [{ username: "Ethan Lee", msg: "Hello, welcome to the chatroom", timestamp: Date.now(), uid: "default" }];

    this.getMessageSub = this.chatService
      .getMessage()
      .subscribe(msg => {
        if (msg.selectedChatroom === this.selectedChatroom) {
          this.messages.push({ username: msg.username, msg: msg.msg, timestamp: msg.timestamp, uid: msg.uid });
        }
      });

    this.chatService.requestPreviousMessages(this.selectedChatroom);
    this.chatService.requestChatroomsList();

    this.getPreviousMessagesSub = this.chatService
      .getPreviousMessages()
      .subscribe(previousMessages => {
        Object.keys(previousMessages).forEach(key => {
          this.messages.push(previousMessages[key]);
        });
      });

    this.getChatroomListSub = this.chatService
      .getChatroomsList()
      .subscribe(list => {
        this.chatroomList = [];
        this.chatroomList = list;
      });
  }

  // createUser(name: string) {
  //   this.currentUser = new User(name);
  // }

  emojiMenuShow() {
    document.getElementById("dropdown-content").classList.toggle("hide");
    document.getElementById("dropdown-content").classList.toggle("emoji-grid");
  }

  imgInputShow() {
    document.getElementById("img-dropdown-content").classList.toggle("hide");
  }

  sendEmoji(emojiSrc) {
    this.sendMsg(emojiSrc + "THIS_IS_IMAGE");
    this.emojiMenuShow();
  }

  scrollToBottom() {
    let messageBox: Element = document.getElementById('messages');
    messageBox.scrollTop = messageBox.scrollHeight;
  }
}
