import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit{

section!:string;
selectedImage:any
loginForm!:FormGroup
signupForm!:FormGroup
schedaForm!:FormGroup
submitted:boolean=false
defaultImage:string=''
showScheda!:boolean
tipoEsercizio:String[]=['Ristorante','Pizzeria','Ristorante_Pizzeria']
constructor(private authService:AuthService,private toastr:ToastrService){}

ngOnInit(): void {
  this.showScheda=false
this.section='Signup'
this.defaultImage='../../../assets/forms/empty-avatar.webp'
this.loginForm= new FormGroup({
  email: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
  password: new FormControl('',[Validators.required,Validators.minLength(6)])
})
this.signupForm=new FormGroup({
  nome: new FormControl('',[Validators.required,Validators.minLength(2)]),
  email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  via:new FormControl('',Validators.required),
  indirizzo:new FormControl('',Validators.required),
  numeroCivico:new FormControl('',Validators.required),
  password:new FormControl('',[Validators.required,Validators.minLength(6)]),
  ripetiPassword:new FormControl('',[Validators.required,Validators.minLength(6)]),
  dichiaro:new FormControl('',Validators.required),
  tipoEsercizio:new FormControl('',Validators.required)
})
this.schedaForm= new FormGroup({
  capitaleSociale: new FormControl('',Validators.required),
  pIva: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]{11}$/)]),
  rappresentante: new FormControl('',[Validators.required,Validators.minLength(3)])
})
}

login(){
this.submitted=true
}

signup(){
this.submitted=true
if(this.signupForm.valid&&this.schedaForm.valid){
  this.authService.signUp(
    {
      nome:this.signupForm.controls['nome'].value,
      email:this.signupForm.controls['email'].value,
      password:this.signupForm.controls['password'].value,
      indirizzo:this.signupForm.controls['via'].value+ " " + this.signupForm.controls['indirizzo'].value + " " +this.signupForm.controls['numeroCivico'].value,
      tipoEsercizio:this.signupForm.controls['tipoEsercizio'].value
    }
  ).subscribe((esercizio:any)=>{
    if(esercizio){
      this.toastr.show("Esercizio salvato")
      this.authService.addScheda(
        {
capitaleSociale:this.schedaForm.controls['capitaleSociale'].value,
pIva:this.schedaForm.controls['pIva'].value,
rappresentante:this.schedaForm.controls['rappresentante'].value,
esercizio_id:esercizio.id
}
      ).subscribe((scheda:any)=>{
        if(scheda){
this.toastr.show("Scheda salvata")
        }
      },err=>{
        this.toastr.show(err.error.message||"Qualcosa è andato storto nel salvataggio della scheda")
      })
    }
  },err=>{
    this.toastr.show(err.error.message||"Qualcosa è andato storto nel salvataggio dell'attività")
  })
}
}

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.selectedImage = reader.result;

        reader.readAsDataURL(file);
    }
  }

}
