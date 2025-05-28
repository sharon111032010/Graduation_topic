import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetIdService {

  constructor() { }
    private userData: { userId: string; account: string } | null = null;

  setUser(data: { userId: string; account: string }) {
    this.userData = data;
  }
  getUserId(): string | undefined {
    // return this.userData ? { userId: this.userData.userId } : null;
    return this.userData ? this.userData.userId  : undefined;
    //回傳一個{}裡回傳一個{}裡面是 userId
  }

  getUser() {
    return this.userData;
  }
}
