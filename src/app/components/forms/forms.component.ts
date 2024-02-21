import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit{

section!:string;

loginForm!:FormGroup
signupForm!:FormGroup

ngOnInit(): void {
this.section='Login'

this.loginForm= new FormGroup({
  email: new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
  password: new FormControl('',[Validators.required,Validators.minLength(6)])
})
this.signupForm=new FormGroup({
  nome: new FormControl('',[Validators.required,Validators.minLength(2)]),
  cognome: new FormControl('',[Validators.required,Validators.minLength(2)]),
  email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  eta:new FormControl('',[Validators.required,Validators.min(18)]),
  password:new FormControl('',[Validators.required,Validators.minLength(6)]),
  ripetiPassword:new FormControl('',[Validators.required,Validators.minLength(6)])
})
}

login(){

}

signup(){

}
}
