import { Component, OnInit } from '@angular/core';
import { DisplayService } from '../services/display.service';
import {Category} from '../Models/category';

@Component({
  selector: 'app-display-categories',
  templateUrl: './display-categories.component.html',
  styleUrls: ['./display-categories.component.css']
})
export class DisplayCategoriesComponent implements OnInit {

  public categoriesAvailable: Category[];
  constructor(private displayService : DisplayService ) {
   }
 
  ngOnInit() {
      this.displayService.getCategories().subscribe((categories)=>{
        this.categoriesAvailable=categories;
      })
    }
  

}
