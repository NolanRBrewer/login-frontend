import { Injectable } from '@angular/core';
import { Login } from './login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  validateLogon(Login: Login) {
    //POST request for login
    console.log(Login)
    const url = `http://localhost:3333/login`;
    return this.http.post(url, Login);
  }
}
