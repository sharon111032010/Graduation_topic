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

  getUser() {
    return this.userData;
  }
}
