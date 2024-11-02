import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ForumService {
  getAll() {
    throw new Error('Method not implemented.');
  }

 
  readonly API_URL="//localhost:8080"
  readonly EndPoint_FORUMS ="/Forums"
  constructor(private httpClient:HttpClient)  {

   }
   getForums(){
    return this.httpClient.get(this.API_URL+this.EndPoint_FORUMS)
   }
}
