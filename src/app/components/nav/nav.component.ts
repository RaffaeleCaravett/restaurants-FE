import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
isAuthenticated:boolean=false

constructor(private authService:AuthService,private router:Router){
this.authService.isAuthenticated.subscribe((boolean:boolean)=>{
  this.isAuthenticated=boolean
})
}

  ngOnInit(): void {
  }
logout(){
  localStorage.clear()
  this.authService.token=''
  this.authService.authenticateUser(false)
  this.router.navigate(['/forms'])
}
}
