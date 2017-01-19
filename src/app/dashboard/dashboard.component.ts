import { Component, OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Container} from "../models/container";
import {SharedService} from "../app.shared";
import {Router} from "@angular/router";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  containers: Container[] =[];
  containerStatus:number[]=[]; //0 if container is off, 1 if it's on
  backupTime:string[]=[];

  constructor(private http: Http, private sharedService: SharedService, private route: Router) {
    //test lacal
    // var container1 = new Container("Travaux pratique du C","C Platform","1");
    // var container2 = new Container("Travaux pratique du Java","Java Platform","2");
    // var container3 = new Container("Travaux pratique du Big Data","Big data Platform","3");
    // var container4 = new Container("Travaux pratique du Web Development","Web Platform","4");
    // this.containers = [container1,container2,container3,container4];

    this.getContainerList();
    console.log(this.containerStatus);
  }

  getContainerList = function(){
    var json =  JSON.stringify({'username':this.sharedService.getUser().username});
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    //this.http.post('http://213.32.27.235:8201/getContainers',json,{headers: headers})
    this.http.post('http://213.32.27.235:8201/getContainers',json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=> {
          console.log(data);
          this.containers=[];
          if (data != {}){
            for (let i=0; i<data.length; i++){
              this.containers.push(new Container(data[i].name, data[i].type,data[i].id,data[i].state));
              console.log(data[i].state);
              this.containerStatus.push(data[i].state);
              this.backupTime.push("");
            }
          }
        },
        error=> console.log(error)
      );
  }

  startContainer = function(index){
    //send delete request to server
    var json =  JSON.stringify({
      'username':this.sharedService.getUser().username,
      'containerId': this.containers[index].id
    });
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    //this.http.post('http://213.32.27.235:8201/getContainers',json,{headers: headers})
    this.http.post('http://213.32.27.235:8201/startContainer',json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=> {
          console.log(data);
          if (data.message==1)
            this.containerStatus[index] = 1;
            window.open(data.containerLink);
        },
        error=> console.log(error)
      );
  }

  stopContainer = function(index){
    //send delete request to server
    var json =  JSON.stringify({
      'username':this.sharedService.getUser().username,
      'containerId': this.containers[index].id
    });
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    //this.http.post('http://213.32.27.235:8201/getContainers',json,{headers: headers})
    this.http.post('http://213.32.27.235:8201/stopContainer',json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=> {
          console.log(data);
          if (data.message==1)
            this.containerStatus[index] = 0;
        },
        error=> console.log(error)
      );
  }

  deleteContainer = function(index){
    //send delete request to server
    var json =  JSON.stringify({
      'username':this.sharedService.getUser().username,
      'containerId': this.containers[index].id
    });
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type','application/json');
    //this.http.post('http://213.32.27.235:8201/getContainers',json,{headers: headers})
    this.http.post('http://213.32.27.235:8201/delContainer',json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=> {
          console.log(data);
          if (data.message==1){
            this.containers.splice(index,1);
            this.containerStatus.splice(index,1);
          }
        },
        error=> console.log(error)
      );
  }

  backupContainer = function(index){
    var json =  JSON.stringify({
      'username':this.sharedService.getUser().username,
      'containerId': this.containers[index].id
    });
    var headers = new Headers();
    headers.append('Content-type','application/json');
    //this.http.post('http://213.32.27.235:8201/getContainers',json,{headers: headers})
    this.http.post('http://213.32.27.235:8201/backupContainer',json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=> {
          console.log(data);
          if (data.message==1){
            this.backupTime[index] = "Last backup at "+data.backupTime.replace("T"," ").replace("Z","");
          }
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
