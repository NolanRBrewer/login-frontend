import { Component, Inject} from '@angular/core';
import{MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-token-dialog',
  standalone: true,
  imports: [],
  templateUrl: './token-dialog.component.html',
  styleUrl: './token-dialog.component.css'
})
export class TokenDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string){}
}
