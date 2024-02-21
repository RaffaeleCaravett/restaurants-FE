import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

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
  title:string[]=['O','R','D','E','R','S','A','P','P']
   ngOnInit(): void {

  this.images = [this.image1, this.image2, this.image3, this.image4];
  setTimeout(()=>{
    this.getSizes()
  },500)
  }
yDeg:number=0
xDeg:number=0
hoverCard(card:any,index:number,event:any){
if(event.movementX>0){
  this.xDeg-=0.9
}else if(event.movementX<0){
  this.xDeg+=0.9
}else if(event.movementY>0){
  this.yDeg+=0.9
}else{
  this.yDeg-=0.9
}
let div = document.getElementById(`card${index}`)

if(div!=null){
  div.style.transform = `rotateY(${-this.xDeg}deg) rotateX(${this.yDeg}deg)`;}
}


getSizes(){
let windowSize= window.innerWidth;
let position;
let zInde;
for(let i = 1 ; i<=9;i++){
  let div = document.getElementsByClassName(`div-${i}`)
switch(i){
 case 1:
  position = -windowSize /100*20
  zInde=9
  break;
  case 2:
    position = -windowSize /100*15
    zInde=8
    break;
    case 3:
      position = -windowSize /100*10
      zInde=7
      break;
      case 4:
        position = -windowSize /100*6
        zInde=6
        break;
        case 5:
          position = -windowSize /100*1.4
          zInde=5
          break;
          case 6:
            position =  windowSize /100*3
            zInde=4
            break;
            case 7:
              position =  windowSize /100*8
              zInde=3
              break;
              case 8:
                position =  windowSize /100*13
                zInde=2
break;
case 9:
  position = windowSize /100*17
  zInde=1
break;
default:
  position=0;
  break;
}
for (let j = 0; j < div.length; j++) {
  let d = div[j] as unknown as HTMLElement
  d.style.right = `${position}px`;
  d.style.zIndex=`${zInde}`
  d.style.transform=`translateX(${0}px)`
}
}

}

@HostListener('window:resize', ['$event'])
onMouseMove(event: MouseEvent) {
  this.getSizes()
}

onHover(index:number){
  let windowSize= window.innerWidth;
  for(let i = 1;i <=9;i++){
    let div = document.getElementsByClassName(`div-${i}`)
    console.log(div)
if(i<index+1){
  for (let j = 0; j < div.length; j++) {
    let d = div[j] as unknown as HTMLElement
    d.style.transform=`translateX(-${windowSize/100*3}px)`
  }
}
if(i>index+1){
  for (let j = 0; j < div.length; j++) {
    let d = div[j] as unknown as HTMLElement
    d.style.transform=`translateX(${windowSize/100*3}px)`
  }
}
  }
}
}


