import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {
office:boolean=false
esercizio:any
ngOnInit(): void {
if(localStorage.getItem('restaurant')){
  this.esercizio=JSON.parse(localStorage.getItem('restaurant')!)
  console.log(this.esercizio)
}
}


goToOffice(){
  this.office=!this.office
}
}
