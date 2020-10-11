import { AddService } from './../services/add.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private add: AddService,
              private route : Router ,
              private loginService : LoginService) { }

  ngOnInit() {
    this.loginService.loadToken();
    if(!this.loginService.authToken){
      this.route.navigate(['/login'])
    }
    else if(!this.loginService.user.admin){
      this.route.navigate(['/login'])
    }
  }

}
