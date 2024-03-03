import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modify-esercizio',
  templateUrl: './modify-esercizio.component.html',
  styleUrls: ['./modify-esercizio.component.scss']
})
export class ModifyEsercizioComponent implements OnInit{

img:string=''
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ModifyEsercizioComponent>,private toastr:ToastrService) { }

ngOnInit(): void {
this.img=this.data
}
}
