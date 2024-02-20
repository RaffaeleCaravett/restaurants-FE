import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
 image1 = 'https://angular.io/assets/images/logos/angular/angular.png'
  image2 = 'https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png'
  image3 = 'https://vuejs.org/images/logo.png'
  image4 = 'https://coryrylan.com/assets/images/posts/types/stenciljs.png'
images:any[]=[]
   ngOnInit(): void {

  this.images = [this.image1, this.image2, this.image3, this.image4];
  }
yDeg:number=0
xDeg:number=0
hoverCard(card:any,index:number,event:any){
if(event.movementX>0){
  this.xDeg-=0.5
}else if(event.movementX<0){
  this.xDeg+=0.5
}else if(event.movementY>0){
  this.yDeg+=0.5
}else{
  this.yDeg-=0.5
}
let div = document.getElementById(`card${index}`)

if(div!=null){
  div.style.transform = `rotateY(${-this.xDeg}deg) rotateX(${this.yDeg}deg)`;}
}

}


