import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../services/display.service';
import { LoginService } from '../services/login.service';
import {Team} from '../Models/team';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscribeService } from '../services/subscribe.service';
import { Match } from '../Models/match';
@Component({
  selector: 'app-display-team',
  templateUrl: './display-team.component.html',
  styleUrls: ['./display-team.component.css']
})
export class DisplayTeamComponent implements OnInit {
  isLogged: boolean;
  matchesAvailable: Match[]=[]
  subbed: boolean = false;
  public teamId: number;
  public currentTeam: Team;
  private routeSub: Subscription;
  constructor(private displayService : DisplayService , 
              private route: ActivatedRoute, 
              private login : LoginService,
              private subscribeService : SubscribeService ) { }

  ngOnInit() {
    this.login.loadToken();
  if(!this.login.authToken){
    this.isLogged=false;
  }
  else{
    this.isLogged=true;
    
    }
    this.routeSub = this.route.params.subscribe(params =>{
      this.teamId = params['id']; 
      // checking if already subbed to this team
      this.subscribeService.getInterestList().subscribe(data =>{
        if(data.filter(follow=>follow.entity._id==this.teamId).length>0){
          this.subbed=true;
        }
      })
      // get the team
      this.displayService.getTeam(this.teamId).subscribe((team)=>{
        this.currentTeam=team;
      })
      this.displayService.getMatchesByTeam(this.teamId).subscribe((matches)=>{
        this.matchesAvailable=matches
      })
    })
  }
  subOrUnsub(){
    this.subscribeService.subscribeTeam(this.teamId).subscribe( reponse => {
      this.subbed = !this.subbed;
    })
     
    
  }
  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}
