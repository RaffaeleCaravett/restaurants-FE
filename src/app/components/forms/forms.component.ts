import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
submitted:boolean=false
defaultImage:string=''
ngOnInit(): void {
this.section='Login'
this.defaultImage='../../../assets/forms/empty-avatar.webp'
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
this.submitted=true
}

signup(){
this.submitted=true
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
