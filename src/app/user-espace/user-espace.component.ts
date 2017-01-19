import { Component, OnInit } from '@angular/core';
import {SharedService} from "../app.shared";

@Component({
  selector: 'app-user-espace',
  templateUrl: './user-espace.component.html',
  styleUrls: ['./user-espace.component.css']
})
export class UserEspaceComponent implements OnInit {

  constructor(private sharedService: SharedService) { }

  selectedTab:number=1;

  setTab = function(tab: number){
    this.selectedTab = tab;
  }

  getTab = function(tab: number){
    if (this.selectedTab == tab){
      return "active";
    } else return "";
  }

  logout = function(){
    this.sharedService.setUser(null);
    location.href = "http://localhost:4200/";
  }

  ngOnInit() {
    /*if (this.sharedService.getUser() == null){
      location.href = 'http://localhost:4200/';
    }*/
  }

}
