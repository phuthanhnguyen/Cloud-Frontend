import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedTab:number=1;

  constructor() { }

  setTab = function(tab: number){
    this.selectedTab = tab;
  }

  getTab = function(tab: number){
    if (this.selectedTab == tab){
      return "active";
    } else return "";
  }

  ngOnInit() {

  }

}
