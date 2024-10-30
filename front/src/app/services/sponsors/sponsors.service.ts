import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sponsors } from 'src/app/model/sponsors';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {
  private apiUrl = environment.apiUrl;
  private apiSponsorsaffiche = `${this.apiUrl}/sponsors/getAll`;
  constructor(private http: HttpClient) { }
listSponsors():Observable<sponsors[]> {
    
    return this.http.get<sponsors[]>(this.apiSponsorsaffiche);
  }
}
