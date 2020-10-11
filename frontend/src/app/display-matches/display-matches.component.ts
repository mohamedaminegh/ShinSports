import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../services/display.service';
import { Match } from '../Models/match';

@Component({
  selector: 'app-display-matches',
  templateUrl: './display-matches.component.html',
  styleUrls: ['./display-matches.component.css']
})
export class DisplayMatchesComponent implements OnInit {
  private matchesAvailable : Match[]= []
  constructor(private displayService : DisplayService) { }
  getMatchesByDate(){
    this.displayService.getRecentMatches().subscribe((matches)=>{
      this.matchesAvailable=matches;
      console.log(this.matchesAvailable)
    })
  }
  getMatchesByPopularity(){
    this.displayService.getPopularMatches().subscribe((matches)=>{
      this.matchesAvailable=matches;
    })
  }
  ngOnInit() {
    this.getMatchesByDate();
    }
  

}
