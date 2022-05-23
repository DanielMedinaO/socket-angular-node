import { Injectable } from '@angular/core';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
  serverMessages!: Subscriber<any>;
  serverSerial!: Subscriber<any>;
  constructor() { }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('message', 'Hello successful data reception!');
  }

  sendMessage(message: string = "") {
    this.socket?.emit('message', message);
  }

  getSocketSerial(): Observable<any> {
    this.socket?.on('serial', (res) => {
      this.serverSerial.next(res);
    });
    return this.getSocketSerialObservable();
  }

  getSocketMessages(): Observable<any> {
    this.socket?.on('message', (res) => {
      this.serverMessages.next(res);
    });
    return this.getSocketMessagesObservable();
  }
  
  private getSocketSerialObservable(): Observable<any> {
    return new Observable(observer => {
      this.serverSerial = observer;
    });
  }
  
  private getSocketMessagesObservable(): Observable<any> {
    return new Observable(observer => {
      this.serverMessages = observer;
    });
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
