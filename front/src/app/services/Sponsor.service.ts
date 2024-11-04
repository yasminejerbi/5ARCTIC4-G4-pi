import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Sponsor } from 'src/app/model/Sponsor';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://192.168.33.10:8082'})
};
@Injectable({
  providedIn: 'root'
})
export class SponsorService {
  private ajouterurl ='http://192.168.33.10:9000/pi/sponsors/ajout';
  private listurl ='http://192.168.33.10:9000/pi/sponsors/getAll';
  private Url='http://192.168.33.10:9000/pi/sponsors/deleteID';
  private Urls='http://192.168.33.10:9000/pi/sponsors';
  private modifierurl = 'http://192.168.33.10:9000/pi/sponsors/update';
/*  

  private userUrl='http://localhost:8085/rania/retrieveAllUsers';
 
  private apiUrl = 'http://localhost:8085/rania/SponsorStats';
  private apiReponseAjout ='http://localhost:8085/rania/addReponse';
  private apiReponseaffiche='http://localhost:8085/rania/retrieveAllReponse'; */
  constructor(private http: HttpClient) { }
  
 /* ajouterSponsor(Sponsor: Sponsor) {
     return this.http.post<any>(this.ajouterurl, Sponsor,httpOptions);
   }*/

   ajouterSponsor(Sponsor: Sponsor): Observable<Sponsor> {
    return this.http.post<Sponsor>(this.ajouterurl, Sponsor, httpOptions);
  }
  listSponsor() {
    
    return this.http.get(this.listurl);
   }
    deleteSponsor(id: number): Observable<void> {
    const url = `${this.Url}/${id}`;
    return this.http.delete<void>(url);
  }

  modifierSponsor(Sponsor: Sponsor) {
    const Url =`${this.modifierurl}`;
    return this.http.put<Sponsor>(Url, Sponsor);

   }
   getSponsor(id: any) {
    return this.http.get('http://192.168.33.10:9000/pi/sponsors/getSponsorsId/' + id)
  }
  /*  supprimerSponsor(id: number): Observable<void> {
    return this.http.delete<void>(http://192.168.33.10:9000/pi/feedback/deleteID/${id});
   } */

/*   ajoutReponseToSponsor(id: number, reponseSponsor: ReponseSponsor): Observable<ReponseSponsor> {
    const url = ${this.Url}/Sponsors/${id}/reponses;
    return this.http.post<ReponseSponsor>(url, reponseSponsor, httpOptions);
}

 
 listSponsor() {
    
   return this.http.get(this.listurl);
  }

  listreponse() {
    
    return this.http.get(this.apiReponseaffiche);
   }
 

  
   modifierSponsor(id:number,Sponsor: Sponsor) {
    const url = ${this.modifierurl}/${id};
    return this.http.put<Sponsor>(url, Sponsor);

   }
 
  

   

   getReponse(id: any) {
    return this.http.get('http://localhost:8085/rania/getReponse/' + id)
  }
  

   getUsers() {
    
    return this.http.get(this.userUrl);
   }


   searchSponsors(keyword: string): Observable<Sponsor[]> {
    const url = ${this.Url}/searchSponsor?keyword=${keyword};
    return this.http.get<Sponsor[]>(url);
  }

 

  getSponsorByName(name: string): Observable<Sponsor> {
    const url = ${this.Url}/getSponsorByName/${name};
    return this.http.get<Sponsor>(url);
} 
 */
}