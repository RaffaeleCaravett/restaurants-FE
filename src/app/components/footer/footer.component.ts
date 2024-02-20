import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{

iconsArray:string[]=[]

ngOnInit(): void {
this.iconsArray=['../../../assets/icons/instagram.png','../../../assets/icons/facebook.png','../../../assets/icons/twitter.jpg',
'../../../assets/icons/whatsapp.png','../../../assets/icons/youtube.png']
}
}
