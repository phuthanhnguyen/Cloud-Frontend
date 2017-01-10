export class User {
  lastName:string;
  firstName:string;
  username:string;
  password:string;
  type:string;

  constructor(lastName:string, firstName:string, username:string,password:string, type:string){
    this.lastName = lastName;
    this.firstName = firstName;
    this.type = type;
    this.username = username;
    this.password = password || 'private';
  }
}
