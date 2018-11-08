import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import 'rxjs-compat';

@Injectable()
export class ChatService {

  constructor(private socket: Socket) { }

  sendMessage(userName: string, msg: string, selectedChatroom: string){
    this.socket.emit("message", {username: userName, msg: msg, selectedChatroom: selectedChatroom});
  }
  
  getMessage() {
    return this.socket
      .fromEvent<any>("message")
      .map( data => data);
  }

  requestPreviousMessages(selectedChatroom) {
    this.socket.emit("previousMessages", selectedChatroom);
  }

  getPreviousMessages() {
    return this.socket
      .fromEvent<any>("previousMessages");
  }

  requestChatroomsList() {
    this.socket.emit("chatroomsList", "request");
  }

  getChatroomsList() {
    return this.socket.fromEvent<any>("chatroomsList");
  }

  escapeChatroom(selectedChatroom, checkoutUsername, newName) {
    this.socket.emit("checkout", { selectedChatroom: selectedChatroom, checkoutUsername: checkoutUsername, checkinUsername: newName})
  }
}