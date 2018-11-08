# Puff Chat

#### By Hyewon Cho, Chan Lee, Victoria Oh, and Hyung Lee
##### 11/08/2018

# Description
* PuffChat is a chatting app using Socket.io, Angular and Firebase. The user can connect with other users with Puffchat to share messages, pictures and emojis.

# Layout of the page
* There will be a header component with the top navbar, logo, search bar, and the login button.
* Under that will be a component with a list of links to common genres of books that users typically visit.
* The carousel component with images and links to featured sales or preorder specials
* Under the carousel are three rows that hold three featured items in each row
* A horizontal scrolling list component that house Barnes and Noble exclusive books.
    * Each of these exclusive books will be a 'exclusive-book' component.
* Footer component with links to various services, help, and 'about us' pages.

## Setup/Installation Requirements

  - Clone this repository from https://github.com/hyewon92cho/puff-chat-client.git
  - Clone the server repository from https://github.com/hyewon92cho/puff-chat-server.git
  - Navigate to the "puff-chat-client" folder in your terminal and type "npm install" to install necessary plugins.
  - Navigate to the "puff-chat-server" folder in your terminal and also type "npm install" to install necessary plugins.
  
  - Create a file in the app folder of the "puff-chat-client" called 'api-keys.ts'.
    * Inside the api-keys.ts file, type in 'export const masterFirebaseConfig = {}'
    * Inside the curly braces, paste what you were sent in the email about API keys.

  - In the "puff-chat-server" folder, create a "credentials" folder. Inside this folder, create the a file with the name you received in the email about API keys and inside copy paste the information in the same email.

  - Type in "ng serve -o" to start the app in your Chrome browswer.

## Support and contact details

  - Hyewon Cho - github.com/Hyewon92Cho
  - Chan Lee - github.com/goenchan
  - Victoria Oh - github.com/VicOhPNW
  - Hyung Lee - github.com/HyungNLee

## Technologies Used

  - Node.js
  - Angular 7
  - Typescript
  - CSS
  - HTML
  - Firebase Realtime Database
  - Firebase Authentication
  - ExpressJS
  - Socket.io
  
This software is licensed under the MIT license.

Copyright (c) 2018 **Hyewon Cho, Chan Lee, Victoria Oh, Hyung Lee**