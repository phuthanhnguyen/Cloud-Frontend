import { Injectable } from '@angular/core';
import {User} from './models/user';

@Injectable()
export class SharedService {
  private user: User = null;

  constructor() {}

  setUser(user: User){
    this.user = user;
  }

  getUser(){
    return this.user;
  }
}
