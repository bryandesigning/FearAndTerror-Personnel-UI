import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: {
    token: string;
    username: string;
  };

  constructor() {
    this.currentUser = JSON.parse( (localStorage.getItem('currentUser') || '{}') );
  }

  public get currentUsername() {
    return this.currentUser.username;
  }
}
