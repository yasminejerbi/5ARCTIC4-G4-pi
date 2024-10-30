import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sponsors } from 'src/app/model/sponsors';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {
  private apiSponsorsaffiche='http://localhost:9001/pi/sponsors/getAll';

  constructor(private http: HttpClient) { }
listSponsors():Observable<sponsors[]> {
    
    return this.http.get<sponsors[]>(this.apiSponsorsaffiche);
  }
}
