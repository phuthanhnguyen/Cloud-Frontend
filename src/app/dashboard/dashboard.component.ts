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
  backupTime:string[]=[];
  containerLink:string=null;
  changeState:boolean[]=[];
  infoShow:boolean=false;
  containerCible: Container = null;

  constructor(private http: Http, private sharedService: SharedService, private route: Router) {
    //test lacal
    /*var container1 = new Container("Travaux pratique du C","C Platform","1",0);
    var container2 = new Container("Travaux pratique du Java","Java Platform","2",0);
    var container3 = new Container("Travaux pratique du Big Data","Big data Platform","3",0);
    var container4 = new Container("Travaux pratique du Web Development","Web Platform","4",0);
    this.containers = [container1,container2,container3,container4];*/

    this.getContainerList();
    /*for (var i=0;i<this.containers.length;i++){
      this.changeState[i]=false;
    }*/
  }

  getContainerList = function(){
    var json =  JSON.stringify({'username':this.sharedService.getUser().username});
    console.log(json);
    var headers = new Headers();
    headers.append('Content-type','application/json');
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
              this.changeState.push(false);
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
    this.http.post('http://213.32.27.235:8201/startContainer',json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=> {
          console.log(data);
          if (data.message==1) {
            this.containers[index].state = 1;
            this.containerLink = data.containerLink;
          }
        },
        error=> console.log(error)
      );
    //handler function
    var handleStart = function(changeStateTab:boolean[], containerTab: Container[], index: number){
      changeStateTab[index] = false;
      containerTab[index].state = 1;
      window.open(this.containerLink);
    }

    this.changeState[index] = true;
    setTimeout(() =>{handleStart(this.changeState,this.containers,index);}, 10000);
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
    this.http.post('http://213.32.27.235:8201/stopContainer',json,{headers: headers})
      .map(res => res.json())
      .subscribe(
        data=> {
          console.log(data);
        },
        error=> console.log(error)
      );

    this.changeState[index] = true;
    setTimeout(() => {
      //window.open(this.containerLink);
      this.changeState[index] = false;
      this.containers[index].state=0;
    }, 12000);
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

  showInfo = function(index){
    this.infoShow = true;
    this.containerCible = this.containers[index];
  }

  ngOnInit() {
    if (this.sharedService.getUser() == null){
      location.href = 'http://213.32.27.235:8200/';
    }
  }

}
