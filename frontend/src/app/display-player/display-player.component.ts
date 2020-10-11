import { Component, OnInit, OnDestroy } from '@angular/core';
import { DisplayService } from '../services/display.service';
import { LoginService } from '../services/login.service';
import {Player} from '../Models/player';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscribeService } from '../services/subscribe.service';
@Component({
  selector: 'app-display-player',
  templateUrl: './display-player.component.html',
  styleUrls: ['./display-player.component.css']
})
export class DisplayPlayerComponent implements OnInit,OnDestroy {
  isLogged: boolean;
  subbed: boolean = false;
  public playerId: number;
  public currentPlayer: Player;
  private routeSub: Subscription;
  constructor(private displayService : DisplayService , private route: ActivatedRoute, private login : LoginService,private subscribeService : SubscribeService) {
   }
 
  ngOnInit() {
    this.login.loadToken();
    if(!this.login.authToken){
      this.isLogged=false;
    }
    else{
      this.isLogged=true;
    }
    this.routeSub = this.route.params.subscribe(params =>{
      this.playerId = params['id']; 
      //check if already subbed to player
      this.subscribeService.getInterestList().subscribe(data =>{
        if(data.filter(follow=>follow.entity._id==this.playerId).length>0){
          this.subbed=true;
        }
      })
      //get player
      this.displayService.getPlayer(this.playerId).subscribe((player)=>{
        this.currentPlayer=player;
      })
    })
  }
  subOrUnsub(){
    this.subscribeService.subscribePlayer(this.playerId).subscribe( reponse => {
      this.subbed = !this.subbed;
    })
  }
  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}
