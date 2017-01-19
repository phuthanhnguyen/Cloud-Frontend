import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {Headers, Http} from "@angular/http";
import {SharedService} from "../app.shared";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = null;
  username:string = null;
  password:string = null;

  constructor(private http: Http, private sharedService: SharedService, private router:Router) { }

  login =  function(){
    var json =  JSON.stringify({'username':this.username,'password':this.password});
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    //this.http.post('http://213.32.27.235:8201/login',json,{headers: headers})
    this.http.post('http://213.32.27.235:8201/login',json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=> {
          console.log(data);
          if (data != {}){
            this.user = new User(data.lastName, data.firstName, data.username, data.password, data.type);
            this.sharedService.setUser(this.user);
            this.router.navigate(["../userespace/dashboard"]);
          }
          else alert('Wrong password or username!');
        },
        error=> console.log(error)
      );
  }

  ngOnInit() {
  }

}
