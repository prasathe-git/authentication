import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../../_models'

@Injectable()

export class ConstantsService {
  private id: number;
  private username: string;
  private password: string;
  private token: string;
  //private currentUserSubject: BehaviorSubject<User>;

  private currentUser: User;

  constructor() { }

  setUserData(currentUser: User) {
      this.id=currentUser.id;
      this.username=currentUser.username;
      this.password=currentUser.password;
      this.token=currentUser.token;
  }

  getUserData() {
    this.currentUser.id = this.id;
    this.currentUser.username = this.username;
    this.currentUser.password = this.password;
    this.currentUser.token = this.token;
    this.currentUser.firstName = null;
    this.currentUser.lastName = null;
    return this.currentUser;
  }

  removeItem() {
    this.id = null;
    this.username = null;
    this.token = null;
    this.password = null;
  }
}