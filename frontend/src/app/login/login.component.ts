import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private login: LoginService,private router: Router,private flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }
  loginMethod() {
    this.login.loginCall(this.login.form.value)
      .subscribe((response) => {
        console.log(response)
        if(response.success){
          this.login.storeUserData(response.token,response.user);
          this.flashMessagesService.show(response.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/'])
      }
      else{
        this.flashMessagesService.show(response.msg, { cssClass: 'alert-success', timeout: 3000 });
        }
        console.log(response)
      });
  }
}
