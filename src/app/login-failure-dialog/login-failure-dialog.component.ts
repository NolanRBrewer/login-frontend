import { Component, Inject } from '@angular/core';
import{MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {DialogOption} from "../dialog-option"

@Component({
  selector: 'app-login-failure-dialog',
  standalone: true,
  imports: [MatDialogContent,
  MatDialogTitle],
  templateUrl: './login-failure-dialog.component.html',
  styleUrl: './login-failure-dialog.component.css'
})
export class LoginFailureDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogOption){console.log(this.data)}

}

