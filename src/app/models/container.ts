export class Container {
  id:string;
  name:string;
  type:string;
  state:number;

  constructor(name:string, type:string, id:string,state:number){
    this.name = name;
    this.type = type;
    this.id = id;
    this.state =state;
  }
}
