import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { Login } from '../login';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailControl = new FormControl("", [Validators.required,Validators.email]);
  passwordControl = new FormControl("",[Validators.required]);
  oneTimeAuthControl = new FormControl("");
  hideRequiredControl = new FormControl(false);
  options = this._formBuilder.group({
    email: this.emailControl,
    password: this.passwordControl,
    oneTimeAuth: this.oneTimeAuthControl,
    hideRequired: this.hideRequiredControl,
  });

  constructor(private _formBuilder: FormBuilder,
    private ApiService: ApiService,
    private router: Router) {}

  onLogin(){
    // call api service to validate credentials
    var Login:Login = {
      user: `${this.options.value.email}`,
      password: `${this.options.value.password}`,
      token: "",
    }
    var isValidated = this.ApiService.validateLogon(Login).subscribe((logValid) => console.log(logValid))
    console.log(`is Validated`, isValidated)
    // how to parse subscription? 
    if (isValidated){
      this.router.navigate(['http://onecause.com']);
    } else {
      // indicate failure to user
      console.log("failed login")
    }
  }
}
