import { Component, NgZone } from '@angular/core';  
import { MessageDto } from 'src/models/dto/message.dto';
import { Message } from 'src/models/message';
import { ChatService } from '../services/chat.service';  
@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
export class AppComponent {  
  
  title = 'ClientApp';  
  txtMessage: string = '';  
  msgDto: MessageDto = new MessageDto;
  uniqueID: string = new Date().getTime().toString();  
  messages = new Array<Message>();  
  constructor(  
    private chatService: ChatService,  
    private _ngZone: NgZone  
  ) {  
    this.subscribeToEvents();  
  }  
  sendMessage(): void {  
    if (this.msgDto.msgText) {  
      let message = new Message();

      message.clientId = this.msgDto.user;
      message.type = "sent";
      message.text = this.msgDto.msgText;
      message.date = new Date();

      this.messages.push(message);
      this.chatService.sendMessage(message);
      this.txtMessage = '';
    }  
  }  
  private subscribeToEvents(): void {  
  
    this.chatService.messageReceived.subscribe((message: Message) => {  
      this._ngZone.run(() => {  
        if (message.clientId !== this.msgDto.user) {  
          message.type = "received";  
          this.messages.push(message);  
          console.log("aboba")
          console.log(message)
        }  
      });  
    });  
  }  
}  