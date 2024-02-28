import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'restaurants';

constructor(private authService:AuthService){}

  ngOnInit(): void {
  Aos.init()
  if(localStorage.getItem('accessToken')){
    this.authService.verifyEsecizioToken(localStorage.getItem('accessToken')!).subscribe((data:any)=>{
      if(data){
        console.log(data)
      }
    })
  }
  }
}
