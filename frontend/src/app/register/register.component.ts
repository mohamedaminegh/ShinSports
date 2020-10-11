import { RegisterService } from './../services/register.service';
import { User } from './../Models/user';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router'
import { Observable } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';

export interface RegisterResponse {
  success: boolean;
  msg: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userModel = new User(0, '', '', '', '', false);

  constructor(private http: HttpClient, private register: RegisterService,private router: Router,private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onClear() {
    this.register.form.reset();
    this.register.initializeFormGroup();
  }
  registerCall(formValue): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('api/users/register', formValue/*, { headers }*/)
  }
  newUser() {
    this.registerCall(this.register.form.value)
      .subscribe((response) => {
        if(response.success){
          this.flashMessagesService.show(response.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login'])
      }
      else{
        console.log('response ', response.msg);
        this.flashMessagesService.show(response.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
  }
  /*connect() {
    const headers = new HttpHeaders()
    // tslint:disable-next-line: max-line-length
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDY4ZmMzYmRkN2NlNDY2MDQ0NDQ3MCIsImF2YXRhciI6InB1YmxpY1xcYXZhdGFyc1xcZGVmYXVsdC5wbmciLCJpYXQiOjE1NzQ2NzA1ODgsImV4cCI6MTU3NDY3NDE4OH0.CjEsEwpJiNNw6xHcvxbn7phvxp11m8TPOQp6naO9hDs');
    this.http.get<{message: string}>('http://localhost:5000/api/users/current', { headers })
      .subscribe((postData) => {
        console.log('repsonse ', postData);
      });
  }*/
}
