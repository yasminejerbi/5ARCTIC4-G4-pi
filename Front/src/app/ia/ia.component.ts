import { Component, OnDestroy } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
@Component({
  selector: 'app-ia',
  templateUrl: './ia.component.html',
  styleUrls: ['./ia.component.css']
})
export class IAComponent  {
  cameraUrl: string = '';
  reply: string = 'Disconnected!';
  private _channel: WebSocketSubject<any> = new WebSocketSubject<any>('ws://192.168.45.6:8000/');



  sendUrlToPython() {
   
    if (this.cameraUrl !== '') {
      const dataToSend = { url: this.cameraUrl };
      this._channel.next(JSON.stringify(dataToSend));
    }
    
    this._channel.subscribe(
      (data) => {
        try {
          if (data.status === "connected") {
            this.reply = "Connected!";
            console.log(this.reply);
          } else if (data.status === "disconnected") {
            this.reply = "Disconnected!";
            console.log(this.reply);
          } else if (data.count !== undefined) {
            this.reply = ` ${data.count}`;
            console.log(this.reply);
          }
        } catch (error) {
          console.error('Error processing data:', error);
          console.log('Received data:', data); // Afficher le contenu reçu pour le débogage
        }
      },
      (error) => {
        console.error('WebSocket error:', error);
      }
    );
    
    

  }
}