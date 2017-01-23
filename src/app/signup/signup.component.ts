import { Component, OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username:string=null;
  email:string=null;
  password:string=null;
  lastName:string=null;
  firstName:string=null;
  type:string=null;
  signedUp:boolean=false;

  constructor(private http: Http) { }

  signup = function(){
    var json =  JSON.stringify({'username':this.username,'email':this.email,'password':this.password, 'lastName':this.lastName, 'firstName':this.firstName, 'type':this.type});
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    //this.http.post('http://213.32.27.235:8201/signup',json,{headers: headers})
    this.http.post('http://213.32.27.235:8201/signup',json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=> {
          console.log(data);
          this.signedUp = true;
          this.email=null;
          this.password=null;
          this.lastName=null;
          this.firstName=null;
          this.type=null;
        },
        error=> console.log(error)
      );
  }

  ngOnInit() {
  }

}
