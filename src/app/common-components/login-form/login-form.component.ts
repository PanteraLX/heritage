import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../components/login/login.service';

@Component({
  selector: 'heritage-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }
}
