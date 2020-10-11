import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../services/display.service';
import { Match } from '../Models/match';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.css']
})
export class FrontPageComponent implements OnInit {
  private popularMatches : Match[] = []
  constructor(private displayService : DisplayService) { }

  ngOnInit() {
    this.displayService.getPopularMatches().subscribe(matches =>{
      this.popularMatches=matches;
    })
  }

}
