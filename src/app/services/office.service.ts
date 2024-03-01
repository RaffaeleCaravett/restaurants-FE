import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthGuard } from "../core/auth.guard";
import { HttpClient } from "@angular/common/http";
import { environment } from "../core/environment";

@Injectable({
  providedIn: 'root'
})


export class OfficeService{


public ingrediente:string='/ingrediente'
public prodotto:string='/prodotto'


constructor(private http:HttpClient){}

getAllIngredienti(){
  return this.http.get(environment.API_URL+this.ingrediente)
}
getAllProdotti(){
  return this.http.get(environment.API_URL+this.prodotto)
}
addProdotti(prodotto:{}){
  return this.http.post(environment.API_URL+this.prodotto,prodotto)
}
}
