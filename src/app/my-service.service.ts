import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  baceUrl = 'http://localhost:8080/';
  result=''
  img=''
  constructor(private http: HttpClient) { }
  faceRecognition<T>(face):Observable<T>{
    return this.http.post<T>(this.baceUrl+'faceRecognition',face);
  }
}
