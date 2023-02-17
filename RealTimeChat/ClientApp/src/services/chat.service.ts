import { EventEmitter, Injectable } from '@angular/core';  
import { HttpClient, HubConnection, HubConnectionBuilder } from '@aspnet/signalr';  
import { Observable, Subject } from 'rxjs';
import { MessageDto } from 'src/models/dto/message.dto';
import { Message } from 'src/models/message';
@Injectable()  
export class ChatService {  
  messageReceived = new EventEmitter<Message>();  
  connectionEstablished = new EventEmitter<Boolean>();  
  
  private _hubConnection: HubConnection;
  private connectionIsEstablished = false;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  sendMessage(message: Message) {
    this._hubConnection.invoke('NewMessage', message);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()  
    .withUrl("http://localhost:5159/MessageHub/")  
    .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout( () => { this.startConnection(); }, 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('MessageReceived', (data: any) => {
      this.messageReceived.emit(data);
    });
  }
}  