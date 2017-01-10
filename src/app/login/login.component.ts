import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {Headers, Http} from "@angular/http";
import {SharedService} from "../app.shared";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = null;
  username:string = null;
  password:string = null;

  constructor(private http: Http, private sharedService: SharedService) { }

  login =  function(){
    var json =  JSON.stringify({'username':this.username,'password':this.password});
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    this.http.post('http://localhost:3000/login',json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=> {
          console.log(data);
          if (data != {}){
            this.user = new User(data.lastName, data.firstName, data.username, data.password, data.type);
            this.sharedService.setUser(this.user);
          }
          else alert('Wrong password or username!');
        },
        error=> console.log(error)
      );
  }

  ngOnInit() {
  }

}
