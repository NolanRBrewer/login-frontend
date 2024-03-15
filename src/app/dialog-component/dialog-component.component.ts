import { Component, Inject } from '@angular/core';
import{MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {DialogOption} from "../dialog-option"

@Component({
  selector: 'app-dialog-component',
  standalone: true,
  imports: [MatDialogContent,
  MatDialogTitle],
  templateUrl: './dialog-component.component.html',
  styleUrl: './dialog-component.component.css'
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogOption){console.log(this.data)}

}
