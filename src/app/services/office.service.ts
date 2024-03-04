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
public citta:string='/citta'

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
getAcquistoByEsercizio(esercizioId:number,page?:number,size?:number,orderBy?:string){
  return this.http.get(environment.API_URL+this.acquisto+`/esercizio/${esercizioId}?page=${page||0}&size=${size||10}&orderBy=${orderBy||'id'}`)
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

getEsercizioByNome(nome:string){
return this.http.get(environment.API_URL+this.esercizio+`/esercizioNome/${nome}`)
}
getEsercizioByCityAndNome(city:number,nome:string){
  return this.http.get(environment.API_URL+this.esercizio+`/esercizio/${city}/${nome}`)
}
getAllCities(){
    return this.http.get(environment.API_URL+this.citta)
}
updateEsercizioImg(esercizio_id:number, file:any){
  console.log('ihih')
  const formData: FormData = new FormData();
      formData.append('file', file);
return this.http.put(environment.API_URL+this.esercizio+'/image/'+esercizio_id,formData)
}
}
