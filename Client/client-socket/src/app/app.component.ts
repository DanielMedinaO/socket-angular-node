import { Component } from '@angular/core';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client-socket';
  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.setupSocketConnection();
    this.socketService.getSocketMessages().subscribe(data => {
      console.log("observable", data);
    });
  }

  sendMjs() {
    console.log("Enviando mensaje");
    this.socketService.sendMessage("Desde el cliente");
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
