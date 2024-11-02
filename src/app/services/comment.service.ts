import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': 'http://localhost:4200'})
};
@Injectable({
  providedIn: 'root'
})
export class CommentService {
 
  constructor(public http: HttpClient){};
  
  getCommentsByForum(forumId: number): Observable<Comment[]> {
    const url = `http://localhost:9000/Comment/comments/${forumId}`;
    return this.http.get<Comment[]>(url);
  }
  private url ='http://localhost:9000/Comment/comments/';
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.url, comment, httpOptions);
}
}
