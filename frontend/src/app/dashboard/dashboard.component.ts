import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { SubscribeService } from '../services/subscribe.service';
import { Match } from '../Models/match';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private followedMatches
  private interestList
  constructor(private loginService : LoginService , private route : Router , private subscribeService : SubscribeService) { }

  ngOnInit() { 
    this.loginService.loadToken();
    if(!this.loginService.authToken){
      this.route.navigate(['/login'])
    }
    this.subscribeService.getInterestList().subscribe(data => {
      this.interestList=data;
    })
    this.subscribeService.getMatchesFollowed().subscribe(matches => {
      this.followedMatches=matches;
    })
  }

}
