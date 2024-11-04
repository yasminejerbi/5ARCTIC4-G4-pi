import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Club } from "../model/club";
import { Recrutement } from '../model/recrutement';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};
@Injectable({
  providedIn: 'root'
})
export class ClubService {
  private ajouterurl ='http://localhost:9000/pi/recrutement/ajoutRecrutement';
  private baseUrl  = 'http://localhost:9000/pi/getAll'; 
  private Url = 'http://localhost:9000/pi';

  constructor(public http: HttpClient){};
  getAll(): Observable<Club[]>{
     return this.http.get<Club[]>(this.baseUrl);
}

ajoutRecrutement(Recrutement: Recrutement): Observable<Recrutement> {
  return this.http.post<Recrutement>(this.ajouterurl, Recrutement, httpOptions);
}

findClubByNomClub(keyword: string): Observable<Club[]> {
  const url = `${this.Url}/findClubByNomClub/${keyword}`;
  return this.http.get<Club[]>(url);
}
}
