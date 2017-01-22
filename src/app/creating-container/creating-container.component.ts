import { Component, OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {SharedService} from "../app.shared";

@Component({
  selector: 'app-creating-container',
  templateUrl: './creating-container.component.html',
  styleUrls: ['./creating-container.component.css']
})
export class CreatingContainerComponent implements OnInit {
  containerName: string = null;
  containerType: string = null;
  containerPassword: string = null;
  created:number=0;

  constructor(private http: Http, private sharedService:SharedService) { }

  createContainer = function(){
    var json = {
      'name': this.containerName,
      'type': this.containerType,
      'username': this.sharedService.getUser().username
    }
    console.log(json);

    var headers = new Headers();
    headers.append('Content-type','application/json');
    this.http.post('http://213.32.27.235:8201/createContainer',json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=> {
          console.log(data);
          this.created=1;
          this.containerPassword = data.password;
        },
        error=> console.log(error)
      );
  }

  ngOnInit() {
    if (this.sharedService.getUser() == null){
      location.href = 'http://213.32.27.235:8200/';
    }
  }

}
