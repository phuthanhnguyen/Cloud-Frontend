export class Container {
  id:string;
  name:string;
  type:string;
  state:number;
  link:string;

  constructor(name:string, type:string, id:string,state:number,link:string){
    this.name = name;
    this.type = type;
    this.id = id;
    this.state = state;
    this.link = link;
  }
}
