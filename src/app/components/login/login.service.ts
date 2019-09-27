import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _username: string;

  private _password: string;
  private _loggedIn: boolean;

  constructor(private router: Router) { }


  public get username(): string {
    return this._username;
  }

  public set username(value: string) {
    this._username = value;
  }

  public get password(): string {
    return this._password;
  }

  public set password(value: string) {
    this._password = value;
  }


  public get loggedIn(): boolean {
    return this._loggedIn;
  }

  public async login(): Promise<void> {
    if (this.username === 'admin' && this.password === 'admin') {
      this._loggedIn = true;
      await this.router.navigate(['/']);
    } else {
      alert('Invalid credentials');
    }
  }
}
