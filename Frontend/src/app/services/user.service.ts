import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from 'src/app/model/User';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private ajouterurl ='http://localhost:9000/pi/utilisateur/ajout';

  constructor(private http: HttpClient) { }


   ajouterUser(User: User): Observable<User> {
    return this.http.post<User>(this.ajouterurl, User, httpOptions);
  }
  getAll(){
    return this.http.get<User[]>('http://localhost:9000/pi/utilisateur/getAll')
  }

}