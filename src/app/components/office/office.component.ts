import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OfficeService } from 'src/app/services/office.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {
office:boolean=true
esercizio:any
prodottoForm!:FormGroup
tipoProdotto:string[]=['ANTIPASTO','PRIMO','SECONDO','PIZZA_BIANCA','PIZZA_ROSSA','DOLCE','BIBITA']
menu:any
ingredienti:any[]=[]
chosedIngredients:any[]=[]
constructor(private officeService:OfficeService){}

ngOnInit(): void {
if(localStorage.getItem('restaurant')){
  this.esercizio=JSON.parse(localStorage.getItem('restaurant')!)
}
this.prodottoForm=new FormGroup({
  tipoProdotto:new FormControl('',Validators.required),
  nome:new FormControl('',Validators.required),
  ingrediente_id:new FormControl('',Validators.required),
  prezzo:new FormControl('',Validators.required),
  esercizio_id:new FormControl(this.esercizio.nome,Validators.required)
})
this.prodottoForm.controls['esercizio_id'].disable()
this.officeService.getAllIngredienti().subscribe((ingredienti:any)=>{
  if(ingredienti){
    this.ingredienti=ingredienti
  }
})
}

goToOffice(){
  this.office=!this.office
}
updateIngredienti(ingrediente:any){
  console.log(ingrediente)
let isThereIngredient:boolean=false
  this.chosedIngredients.forEach((i:any)=>{
if(i.id==ingrediente.id){
  isThereIngredient=true;
}
})

if(!isThereIngredient){
  this.chosedIngredients.push(ingrediente)
}
}
}
