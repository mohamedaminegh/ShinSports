import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean 
  isAdmin: boolean
  constructor(private login: LoginService,private router: Router,private flashMessagesService: FlashMessagesService) { 
    login.getLoggedInName.subscribe(state => this.changeState(state));
    login.getAdminEmitter.subscribe(state => this.changeStateAdmin(state));
  }

  ngOnInit() {
    this.login.loadToken();
  if(!this.login.authToken){
    this.isLogged=false;
  }
  else{
    this.isLogged=true;
  }
  if (this.login.user.admin){
    this.isAdmin=true;
  }
  else{
    this.isAdmin=false;
  }
  }
  changeState(state:boolean){
    this.isLogged=state;
  }
  changeStateAdmin(state:boolean){
    this.isAdmin=state;
  }
  onLogoutClick(){
    this.login.logout();
    this.flashMessagesService.show('You are logged out', {cssClass:'alert-success',timeout:3000}) 
    this.router.navigate(['/login']);
    return false; 
  }
}
