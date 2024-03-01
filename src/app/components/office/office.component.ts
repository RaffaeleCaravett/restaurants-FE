import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

constructor(private officeService:OfficeService,private toastr:ToastrService){}

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
this.getAllProdotti()
}

goToOffice(){
  this.office=!this.office
}
updateIngredienti(ingrediente:any){
let ingr;
let isThereIngredient:boolean=false
this.ingredienti.forEach((ing:any)=>{
  if(ing.id==ingrediente){
    ingr=ing
    this.chosedIngredients.forEach((i:any)=>{
if(i.id==ing.id){
  isThereIngredient=true;
}
})
  }
})


if(!isThereIngredient){
  this.chosedIngredients.push(ingr)
}
}
removeItemFromChosed(item:any){
let newIngredients:any[]=[]
  this.chosedIngredients.forEach((ingredients:any)=>{
    if(ingredients.id!=item.id){
      newIngredients.push(ingredients)
    }
  })


  this.chosedIngredients=newIngredients
}
addProdotto(){
if(this.prodottoForm.valid){
  let ingredients:any[]=[]
  this.chosedIngredients.forEach((i:any)=>{
    ingredients.push(i.id)
  })

  this.officeService.addProdotti({
    nome:this.prodottoForm.controls['nome'].value,
    prezzo:this.prodottoForm.controls['prezzo'].value,
    tipoProdotto:this.prodottoForm.controls['tipoProdotto'].value,
    esercizio_id:this.esercizio.id,
    ingredienti_id:ingredients
  }).subscribe({
    next:(prodotto:any)=>{
      if(prodotto){
        this.getAllProdotti()
      }
    },
    error:(err:any)=>{
      this.toastr.show(err.error.message||"Qualcosa è andato storto nel salvataggio del prodotto.")
    },
    complete:()=>{}
  })
}
}

getAllProdotti(){
this.officeService.getAllProdotti().subscribe((prodotto:any)=>{
if(prodotto){
  this.menu=prodotto
}
})
}
}
