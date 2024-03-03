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
modify:boolean=false
selectedObject:any=null
acquisti:any
incasso:number=0
clienteList:any
clienteParam:any
acquistiParam:any
showAnno:boolean=false
showMese:boolean=false
buyForm!:FormGroup
constructor(private officeService:OfficeService,private toastr:ToastrService){}

ngOnInit(): void {
if(localStorage.getItem('restaurant')){
  this.esercizio=JSON.parse(localStorage.getItem('restaurant')!)
this.orderClienti('id')
  this.officeService.getAcquistoByEsercizio(this.esercizio.id).subscribe((acquisti:any)=>{
    if(acquisti){
      this.acquisti=acquisti
       for(let a of acquisti.content){
        this.incasso+=a.totale
       }
      }

  })
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
this.buyForm= new FormGroup({
  anno:new FormControl(''),
  mese:new FormControl('')
})
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
deleteItem(item:number){
this.officeService.deleteProdott(this.esercizio.id,item).subscribe({
  next:(items:any)=>{
if(items){
  this.toastr.show('Prodotto eliminato')
  this.getAllProdotti()
}
},
error:(err:any)=>{this.toastr.show(err.error.message||"Qualcosa è andato storto nell'eliminazione del dato")},
complete:()=>{}
})
}

modifyObject(object?:any){
  if(object!='modify'){
      this.selectedObject=object
      this.modify=true
this.prodottoForm.patchValue({
tipoProdotto:object.tipoProdotto,
nome:object.nomeProdotto,
prezzo:object.prezzo
  })
this.chosedIngredients=object.ingredientes
    }else{
let ingredients:any[]=[]
for(let i of this.chosedIngredients){
  ingredients.push(i.id)
}
      this.officeService.putProdotto(this.selectedObject.id,
  {
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
      this.toastr.show(err.error.message||"Qualcosa è andato storto nella modifica del prodotto.")
    },
    complete:()=>{
      this.prodottoForm.reset()
      this.modify=false;
      this.selectedObject=null;
      this.prodottoForm.controls['esercizio_id'].setValue(this.esercizio.nome);
      this.chosedIngredients=[]
    }
  })
  }
}
orderClienti(param:string,page?:number){
  this.officeService.getClienteByEsercizio(this.esercizio.id,page||0,10,param).subscribe((clienti:any)=>{
 this.clienteList=clienti
 this.clienteParam=param
  })
}
orderAcquisto(param:string,page?:number){
  this.officeService.getAcquistoByEsercizio(this.esercizio.id,page||0,10,param).subscribe((acquisti:any)=>{
    this.acquisti=acquisti
    this.acquistiParam=param
     })
}
searchBuy(){
  if(this.showAnno&&!this.showMese){
    this.officeService.getAcquistoByYear(this.esercizio.id,this.buyForm.controls['anno'].value).subscribe((data:any)=>{
      console.log(data)
      this.acquisti=data
    })
  }else if (this.showAnno&&this.showMese){
    this.officeService.getAcquistoByYearAndMese(this.esercizio.id,this.buyForm.controls['anno'].value,this.buyForm.controls['mese'].value).subscribe((data:any)=>{
      console.log(data)
      this.acquisti=data
    })
  }else{
    this.toastr.show("seleziona almeno una opzione")
  }
  }
}
