import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRestServiceService {

  public url = 'http://localhost:9000';
  constructor(private http: HttpClient) { }

  saveToken = (token: any) => {
    return this.http.post(`${this.url}/api/save`, {
      token
    })
  }
}
