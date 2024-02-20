import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
isAuthenticated:boolean=false

constructor(private authService:AuthService){
this.authService.isAuthenticated.subscribe((boolean:boolean)=>{
  this.isAuthenticated=boolean
})
}

  ngOnInit(): void {
  }

}
