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
  private ajouterurl ='http://localhost:9003/pi/utilisateur/ajout';
  private updateUrl='http://localhost:9003/pi/utilisateur/update';
  constructor(private http: HttpClient) { }

  private verifyEmailUrl = 'http://localhost:9003/pi/utilisateur/verify-email'
   /*ajouterUser(User: User): Observable<User> {
    return this.http.post<User>(this.ajouterurl, User, httpOptions);
  }*/
  getAll(){
    return this.http.get<User[]>('http://localhost:9003/pi/utilisateur/getAll')
  }
  getUserById(id:number){
    return this.http.get<User>('http://localhost:9003/pi/utilisateur/getUtilisateurId/'+id)
  }
  recupererMDP(email:String,numTel:String){
    return this.http.get<number>('http://localhost:9003/pi/utilisateur/mdp/'+email+'/'+numTel)
  }
 /* updateUser(user:User){
    return this.http.put('http://localhost:9000/pi/utilisateur/updateUtilisateur',user)
  }*/
  verifyEmail(email: string): Observable<any> {
    return this.http.post<any>(this.verifyEmailUrl, { email }, httpOptions);
  }
  ajouterUser(user: User, image: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('nomUtilisateur',user.nomUtilisateur || '');
    formData.append('prenomUtilisateur', user.prenomUtilisateur|| '');
    formData.append('email', user.email|| '');
    formData.append('numTel', user.numTel|| '');
    formData.append('motDePasse', user.motDePasse|| '');
    formData.append('role', user.role?.toString()|| '');
    formData.append('interet', user.interet?.toString()|| '');
    if (image) {
      formData.append('image', image, image.name);
      console.log(formData.get('image'))
  }
    const options = {
        headers: new HttpHeaders()
    
    };

    return this.http.post<any>(`${this.ajouterurl}`, formData, options);
  }
  updateUser(user: User, image: File | null): Observable<any> {
    const formData = new FormData();
    formData.append('nomUtilisateur', user.nomUtilisateur || '');
    formData.append('prenomUtilisateur', user.prenomUtilisateur || '');
    formData.append('email', user.email || '');
    formData.append('numTel', user.numTel || '');
    formData.append('motDePasse', user.motDePasse || '');
    formData.append('role', user.role?.toString() || '');
    formData.append('interet', user.interet?.toString() || '');
    if (image) {
      formData.append('image', image, image.name);
    }
  
    const options = {
      headers: new HttpHeaders()
    };
  
    return this.http.put<any>(`${this.updateUrl}/${user.id}`, formData, options);
  }
}