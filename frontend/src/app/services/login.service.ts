import { Injectable,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../Models/user';
export interface LoginResponse {
  success: boolean;
  token: string;
  msg: string;
  user: User
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  @Output() getAdminEmitter: EventEmitter<any> = new EventEmitter();
  authToken:any
  user:any
  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  
  storeUserData(token,user){
    localStorage.setItem('id_token',token)
    localStorage.setItem('user',JSON.stringify(user))
    this.authToken=token;
    this.user=user;
    this.getLoggedInName.emit('true');
    if(this.user.admin){
    this.getAdminEmitter.emit('true');
  }  
  }
  loadToken(){
    const token = localStorage.getItem('id_token')
    this.authToken=token;
    const user = localStorage.getItem('user')
    this.user=JSON.parse(user);
  }
  logout(){
    this.authToken= null;
    this.user = null;
    localStorage.clear();
    this.getLoggedInName.emit(false);
    this.getAdminEmitter.emit(false);
  }
  loginCall(formValue): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('api/users/login', formValue)
  }
}
