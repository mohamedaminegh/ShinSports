import { Team } from './../Models/team';
import { Component, OnInit } from '@angular/core';
import { AddService } from '../services/add.service';
import { DisplayService } from '../services/display.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Category } from '../Models/category';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {
  public teams: Team[];
  public categories: Category[];

  constructor(private add: AddService ,
              private route: Router ,
              private displayService: DisplayService,
              private loginService: LoginService ) { }

    ngOnInit() {
      this.loginService.loadToken();
      if (!this.loginService.authToken){
        this.route.navigate(['/login'])
      } else if (!this.loginService.user.admin){
        this.route.navigate(['/login'])
      }
      this.displayService.getTeams().subscribe((teams)=>{
        this.teams = teams;
      });
      this.displayService.getCategories().subscribe((categories)=>{
        this.categories = categories;
      });
    }

}
