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
public acquisto:string='/acquisto'
public cliente:string='/cliente'
public esercizio:string='/esercizio'

constructor(private http:HttpClient){}

getAllIngredienti(){
  return this.http.get(environment.API_URL+this.ingrediente)
}
getAllProdotti(){
  return this.http.get(environment.API_URL+this.prodotto)
}
deleteProdott(esercizioId:number,id:number){
  return this.http.delete(environment.API_URL+this.prodotto+'/'+esercizioId+'/'+id)
}
addProdotti(prodotto:{}){
  return this.http.post(environment.API_URL+this.prodotto,prodotto)
}
putProdotto(prodottoId:number,prodotto:any){
  return this.http.put(environment.API_URL+this.prodotto+'/'+prodottoId,prodotto)
}
getAcquistoByEsercizio(esercizioId:number){
  return this.http.get(environment.API_URL+this.acquisto+'/esercizio/'+esercizioId)
}
getClienteByEsercizio(esercizioId:number,page?:number,size?:number,orderBy?:string){
return this.http.get(environment.API_URL+this.esercizio+`/byEsercizio/${esercizioId}?page=${page||0}&size=${size||10}&orderBy=${orderBy||'id'}`)
}
getAcquistoByYear(esercizio_id:number,year:number){
return this.http.get(environment.API_URL+this.acquisto+`/esercizioAndAnno/${esercizio_id}/${year}`)
}
getAcquistoByYearAndMese(esercizio_id:number,year:number,mese:number){
  return this.http.get(environment.API_URL+this.acquisto+`/esercizioAnnoMese/${esercizio_id}/${year}/${mese}`)
}


}
