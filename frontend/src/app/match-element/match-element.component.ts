import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../Models/match';
import { SubscribeService } from '../services/subscribe.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-match-element',
  templateUrl: './match-element.component.html',
  styleUrls: ['./match-element.component.css']
})
export class MatchElementComponent implements OnInit {
  @Input() match 
  private isLogged : boolean = false;
  private subbed : boolean = false;
  private matchId : number
  constructor( private login : LoginService,private subscribeService : SubscribeService) { }

  ngOnInit() {
    this.matchId=this.match._id;
    this.login.loadToken();
    if(!this.login.authToken){
      this.isLogged=false;
    }
    else{
      this.isLogged=true;
    }
      //check if already subbed to player
      this.subscribeService.getMatchesFollowed().subscribe(data =>{
        if(data.filter(follow=>follow.match._id==this.matchId).length>0){
          this.subbed=true;
        }
      })
    }
    subOrUnsub(){
      this.subscribeService.subscribeMatch(this.matchId).subscribe( reponse => {
        this.subbed = !this.subbed;
      })
    } 

}
