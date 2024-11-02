import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Forum } from '../model/forum';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};
@Injectable({
  providedIn: 'root'
})
export class ForumService {
private baseUrl  = 'http://localhost:9000/pi/Forums/getAll';
  constructor(public http: HttpClient){};
  getAll(): Observable<Forum[]>{
     return this.http.get<Forum[]>(this.baseUrl);
}
private ajouterurl ='http://localhost:9000/pi/Forums/ajout';
ajouterForum(Forum: Forum): Observable<Forum> {
  return this.http.post<Forum>(this.ajouterurl, Forum, httpOptions);
}
private Url='http://localhost:9000/pi/Forums/deleteID'
deleteForum(id: number): Observable<void> {
  const url = `${this.Url}/${id}`;
  return this.http.delete<void>(url);
}

updateForum(forum:Forum){
  return this.http.put('http://localhost:9000/pi/Forums/updateForum',forum)
}
 getForumById(id:number){
    return this.http.get<Forum>('http://localhost:9000/pi/Forums/getForumId/'+id)
  }
 

  likeForum(idForum: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.put(`http://localhost:9000/pi/Forums/like/${idForum}`, {}, { headers });
}

dislikeForum(idForum: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.put(`http://localhost:9000/pi/Forums/dislike/${idForum}`, {}, { headers });
}
  private commentUrl  = 'http://localhost:9000/Comment/comments';
  getCommentsByForum(): Observable<Comment[]>{
     return this.http.get<Comment[]>(this.commentUrl);
} 
}
