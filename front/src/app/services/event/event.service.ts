import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from 'rxjs';
import { events } from 'src/app/model/event'; 
import { sponsors } from 'src/app/model/sponsors';
import { User } from 'src/app/model/User';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = environment.apiUrl; // Base API URL from environment
  private listurl = `${this.apiUrl}/event/getAll`;
  private apiSponsorsaffiche = `${this.apiUrl}/sponsors/getAll`;
  private apiUseraffiche = `${this.apiUrl}/utilisateur/getAll`;
  private deleteEventUrl = `${this.apiUrl}/event/deleteID/`;

  constructor(private http: HttpClient) { }

  listevents(): Observable<events[]> {
    return this.http.get<events[]>(this.listurl);
  }

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUseraffiche);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/utilisateur/getUtilisateurId/${id}`);
  }

  listSponsors(): Observable<sponsors[]> {
    return this.http.get<sponsors[]>(this.apiSponsorsaffiche);
  }

  getEvent(id: number): Observable<events> {
    return this.http.get<events>(`${this.apiUrl}/event/getEvenementId/${id}`);
  }

  deleteEvent(id: number): Observable<events> {
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
    formData.append('eventType', event.eventType.toString());

    if (image) {
      formData.append('photo', image, image.name);
    }

    return this.http.post<any>(`${this.apiUrl}/event/addEvent`, formData);
  }

  updateEvent(eventId: number, event: events, image: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('nomEvenement', event.nomEvenement);
    formData.append('lieuEvenement', event.lieuEvenement);
    formData.append('actionEvenement', event.actionEvenement);
    formData.append('dateDebut', event.dateDebut.toString());
    formData.append('dateFin', event.dateFin.toString());
    formData.append('numPlaces', event.numPlaces.toString());
    formData.append('eventType', event.eventType.toString());

    if (image) {
      formData.append('photo', image, image.name);
    }

    return this.http.put<any>(`${this.apiUrl}/event/updateEvent/${eventId}`, formData);
  }

  assignUserToEvent(eventId: number, userId: number): Observable<any> {
    const params = { eventId: eventId.toString(), userId: userId.toString() };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(`${this.apiUrl}/event/assignUserToEvent`, null, { params, headers: options.headers })
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return throwError(error);
        })
      );
  }
}
