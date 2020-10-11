import { AddService } from './../services/add.service';
import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../services/display.service';
import {Category} from '../Models/category';
import { LoginService } from '../services/login.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  public categories: Category[];

  constructor(private add: AddService , 
              private route : Router ,
              private displayService : DisplayService ,
              private loginService : LoginService) 
                { }

  ngOnInit() {
    this.loginService.loadToken();
  if(!this.loginService.authToken){
    this.route.navigate(['/login'])
  }
  else if(!this.loginService.user.admin){
    this.route.navigate(['/login'])
  }
    this.displayService.getCategories().subscribe((categories)=>{
      this.categories=categories;
    })
  }

}
