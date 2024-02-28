import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'restaurants';

constructor(private authService:AuthService,private router:Router){}

  ngOnInit(): void {
  Aos.init()
  if(localStorage.getItem('accessToken')){
    this.authService.verifyEsecizioToken(localStorage.getItem('accessToken')!).subscribe({
      next:(data:any)=>{
      if(data){
localStorage.setItem('restaurant',JSON.stringify(data))
this.authService.token=localStorage.getItem('accessToken')!
this.authService.authenticateUser(true)
localStorage.setItem('accessToken',localStorage.getItem('accessToken')!)
this.router.navigate(['/office'])
      }
    },
    error:(error:any)=>{

this.authService.verifyEsecizioRefreshToken(localStorage.getItem('refreshToken')!).subscribe((tokens:any)=>{
  if(tokens){
    this.authService.verifyEsecizioToken(localStorage.getItem('accessToken')!).subscribe({
      next:(data:any)=>{
      if(data){
        localStorage.setItem('restaurant',JSON.stringify(data))
        this.authService.token=localStorage.getItem('accessToken')!
        this.authService.authenticateUser(true)
        localStorage.setItem('accessToken',localStorage.getItem('accessToken')!)
        this.router.navigate(['/office'])      }
    },error:()=>{this.router.navigate(['/home'])}
    ,complete:()=>{}
  })

  }
})
    },complete:()=>{}

  })
  }
}
}
