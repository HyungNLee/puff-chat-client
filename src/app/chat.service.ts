import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import 'rxjs-compat';

@Injectable()
export class ChatService {

  constructor(private socket: Socket) { }

  sendMessage(userName: string, msg: string, selectedChatroom: string, uid: string){
    this.socket.emit("message", {username: userName, msg: msg, selectedChatroom: selectedChatroom, uid: uid});
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

  updateUsername(selectedChatroom, userUID, previousName, newName) {
    this.socket.emit("updateUsername", { selectedChatroom: selectedChatroom, userUID: userUID, previousUsername: previousName, newUsername: newName})
  }

  // logout(selectedChatroom, checkoutUsername) {
  //   this.socket.emit("logout", { selectedChatroom: selectedChatroom, checkoutUsername: checkoutUsername});
  // }

  checkin(selectedChatroom, checkinUsername, checkinUID) {
    this.socket.emit("checkin", { selectedChatroom: selectedChatroom, checkinUsername: checkinUsername, checkinUID: checkinUID });    
  }

  getMemberCountRequest(chatroomId) {
    this.socket.emit("getMemberCount", chatroomId);
  }

  getMemberCount() {
    return this.socket.fromEvent<any>("getMemberCount");
  }
}