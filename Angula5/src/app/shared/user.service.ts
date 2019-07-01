import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:8081/api/';
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      username: user.username,
      password: user.password,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname
    }
    
    let reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + 'user/register', body,{headers : reqHeader});
  }

  userAuthentication(username, password) {
    let data = {'username':  username,  'password': password};
    console.log(data);
    let reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'dataType':'json',  'No-Auth':'True'});
    return this.http.post(this.rootUrl + 'auth', data, { headers: reqHeader });
  }

  getUserInfos(){
    console.log(localStorage.getItem("userToken"));
    let reqHeader = new HttpHeaders({'Authorization': localStorage.getItem("userToken")});
    return  this.http.get(this.rootUrl+'user', {headers: reqHeader });
  }

}