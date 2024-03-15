import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { Login } from '../login';
import { ApiService } from '../api.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
//import { LoginFailureDialogComponent } from '../login-failure-dialog/login-failure-dialog.component';
import {DialogOption} from '../dialog-option';
import {DialogComponent} from '../dialog-component/dialog-component.component';

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
    MatDialogModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailControl = new FormControl("", [Validators.required,Validators.email]);
  passwordControl = new FormControl("",[Validators.required]);
  oneTimeAuthControl = new FormControl("",[Validators.required]);
  hideRequiredControl = new FormControl(false);
  options = this._formBuilder.group({
    email: this.emailControl,
    password: this.passwordControl,
    oneTimeAuth: this.oneTimeAuthControl,
    hideRequired: this.hideRequiredControl,
  });

  constructor(private _formBuilder: FormBuilder,
    private ApiService: ApiService,
    private dialog: MatDialog) {}

  onLogin(){
    // call api service to validate credentials
    var login:Login = {
      user: `${this.options.value.email}`,
      password: `${this.options.value.password}`,
      token: `${this.options.value.oneTimeAuth}`,
    }
    
    this.ApiService.validateLogon(login).subscribe((validLogin) => {
      console.log(`is Validated`, validLogin);
      // handle redirect based on validation
      if (validLogin){
        var dialog: DialogOption = {
          title: "Login Success",
          message: "Redirecting . . .",
        }
        this.dialog.open(DialogComponent, {
          width: "300px",
          height: "200px",
          data: dialog
        });
        setTimeout(()=> window.location.href = 'https://www.onecause.com/', 3000);
      } else {
        // indicate failure to user
        var dialog: DialogOption = {
          title: "Login Failure",
          message: "double check the login information and make sure to include the authentication token.",
        }
        console.log("failed login");
        this.dialog.open(DialogComponent, {
          width: "300px",
          height: "200px",
          data: dialog
        });
      }
    });
  }
  oneAuth(){

    // Get the current time
    // add 0 to the start of single digit times
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    // padding times
    const padHour = hour.toString().padStart(2,'0');
    const padMinute = minute.toString().padStart(2,'0');
    const timeToken = padHour + padMinute;
    console.log("OneAuth call")
    console.log(timeToken)
    var dialog: DialogOption = {
      title: "Authentication Token",
      message: timeToken,
    }
    // Open token dialog pop up
    this.dialog.open(DialogComponent, {
      width: "300px",
      height: "150px",
      data: dialog
    });
  }
  /* TODO make a register button for new users
  */
}