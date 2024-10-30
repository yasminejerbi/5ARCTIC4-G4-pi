import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import { events } from 'src/app/model/event'; 
import { sponsors } from 'src/app/model/sponsors';

import { Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private listurl ='http://localhost:9001/pi/event/getAll';
  private apiSponsorsaffiche='http://localhost:9001/pi/sponsors/getAll';
  private apiUseraffiche='http://localhost:9001/pi/utilisateur/getAll';

  private deleteEventUrl = "http://localhost:9001/pi/event/deleteID/";
  private apiUrl = 'http://localhost:9001/pi/event';
  /*private listurl ='http://clubhub.southafricanorth.azurecontainer.io:9001/pi/event/getAll';
private apiSponsorsaffiche='http://clubhub.southafricanorth.azurecontainer.io:9001/pi/sponsors/getAll';
private apiUseraffiche='http://clubhub.southafricanorth.azurecontainer.io:9001/pi/utilisateur/getAll';

private deleteEventUrl = "http://clubhub.southafricanorth.azurecontainer.io:9001/pi/event/deleteID/";
private apiUrl = 'http://clubhub.southafricanorth.azurecontainer.io:9001/pi/event';
*/
  constructor(private http: HttpClient) { }
  listevents():Observable<events[]>{
    
    return this.http.get<events[]>(this.listurl);
    
   }
   listUsers():Observable<User[]>{
    
    return this.http.get<User[]>(this.apiUseraffiche);
    
   }
   getUserById(id:number){
    return this.http.get<User>('http://localhost:9001/pi/utilisateur/getUtilisateurId/'+id)
  }
   listSponsors():Observable<sponsors[]> {
    
    return this.http.get<sponsors[]>(this.apiSponsorsaffiche);
   }
   
   getEvent(id: Number) {
    return this.http.get('http://localhost:9001/pi/event/getEvenementId/'+ id)
  }
   deleteEvent(id : number) {
    return this.http.delete<events>(this.deleteEventUrl + id);
   }
   createEvent(event: events, image: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('nomEvenement', event.nomEvenement);
    formData.append('lieuEvenement', event.lieuEvenement);
    formData.append('actionEvenement', event.actionEvenement);
    formData.append('dateDebut', event.dateDebut.toString());
    formData.append('dateFin', event.dateFin.toString());
    formData.append('numPlaces', event.numPlaces.toString());
    formData.append('eventType', event.eventType.toString()); // Assuming eventType is of type Event_type

    //formData.append('image', image, image.name);
    if (image) {
      formData.append('photo', image, image.name);
  }
    const options = {
        headers: new HttpHeaders()
            // Uncomment below line if needed
            // .set('Content-Type', 'multipart/form-data')
    };

    return this.http.post<any>(`${this.apiUrl}/addEvent`, formData, options);
  }
  updateEvent(eventId: number, event: events, image: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('nomEvenement', event.nomEvenement);
    formData.append('lieuEvenement', event.lieuEvenement);
    formData.append('actionEvenement', event.actionEvenement);
    formData.append('dateDebut', event.dateDebut.toString());
    formData.append('dateFin', event.dateFin.toString());
    formData.append('numPlaces', event.numPlaces.toString());
    formData.append('eventType', event.eventType.toString()); // Assuming eventType is of type Event_type

    if (image) {
      formData.append('photo', image, image.name);
    }

    const options = {
      headers: new HttpHeaders()
        // Uncomment below line if needed
        // .set('Content-Type', 'multipart/form-data')
    };

    return this.http.put<any>(`${this.apiUrl}/updateEvent/${eventId}`, formData, options);
  }
  assignUserToEvent(eventId: number, userId: number): Observable<any> {
    const params = { eventId: eventId.toString(), userId: userId.toString() };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(`${this.apiUrl}/assignUserToEvent`, null, { params, headers: options.headers })
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }
   
}
