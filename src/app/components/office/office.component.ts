import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {
office:boolean=true
esercizio:any
antipastoForm!:FormGroup
tipoProdotto:string[]=['ANTIPASTO','PRIMO','SECONDO','PIZZA_BIANCA','PIZZA_ROSSA','DOLCE','BIBITA']
menu:any
ngOnInit(): void {
if(localStorage.getItem('restaurant')){
  this.esercizio=JSON.parse(localStorage.getItem('restaurant')!)
  console.log(this.esercizio)
}
}


goToOffice(){
  this.office=!this.office
}
}
