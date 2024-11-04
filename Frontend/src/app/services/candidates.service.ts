import { Injectable } from '@angular/core';
import { Recrutement } from '../model/recrutement';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RecrutementID } from '../model/RecrutementID';
import { SmsRequest } from '../model/SmsRequest';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};
@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  private modifierurl = 'http://localhost:9000/pi/recrutement/updateRecrutement';
  private baseUrl  = '  http://localhost:9000/pi/recrutement/getAll'; 
  private smsUrl = ' http://localhost:9000/pi/api/sms/sendSms' ;
  constructor(public http: HttpClient){};
  getAll(): Observable<Recrutement[]>{
     return this.http.get<Recrutement[]>(this.baseUrl);
}
modifierCandidate(candidate: Recrutement) {
  return this.http.put('http://localhost:9000/pi/recrutement/updateRecrutement',candidate)
 }
getRecrutementId(id: RecrutementID): Observable<Recrutement> {
  const { idClub, idUtilisateur } = id; 
  const url = `http://localhost:9000/pi/recrutement/getRecrutementId/${idClub}/${idUtilisateur}`;
  return this.http.get<Recrutement>(url);
}
deleteRecrutementById(id: RecrutementID){
  const { idClub, idUtilisateur } = id; 
  const url = `http://localhost:9000/pi/recrutement/deleteID/${idClub}/${idUtilisateur}`;
  return this.http.delete(url)
}
  sendSms(SmsRequest: SmsRequest){
    return this.http.post(this.smsUrl, SmsRequest, httpOptions);
  } 
}
