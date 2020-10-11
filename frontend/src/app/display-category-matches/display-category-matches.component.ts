import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../services/display.service';
import { Match } from '../Models/match';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-category-matches',
  templateUrl: './display-category-matches.component.html',
  styleUrls: ['./display-category-matches.component.css']
})
export class DisplayCategoryMatchesComponent implements OnInit {
  private matchesAvailable : Match[]= []
  private category : String
  private routeSub: Subscription;
  constructor(private displayService : DisplayService , private route: ActivatedRoute,) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params =>{
        this.category = params['name']; 
        this.displayService.getMatchesByCategory(this.category).subscribe((matches)=>{
            this.matchesAvailable=matches;
            console.log(this.matchesAvailable)})
        })
  }
  
  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}
