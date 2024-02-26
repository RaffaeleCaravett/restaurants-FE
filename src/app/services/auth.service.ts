import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthGuard } from "../core/auth.guard";
import { HttpClient } from "@angular/common/http";
import { environment } from "../core/environment";

@Injectable({
  providedIn: 'root'
})


export class AuthService{

public isAuthenticated:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
public auth:string='/auth'
public register:string='/register'
public schedaAnagrafica:string='/schedaAnagrafica'
constructor(private authGuard:AuthGuard,private http:HttpClient){}

authenticateUser(bool:boolean){
this.authGuard.authenticateUser(bool)
this.isAuthenticated.next(bool);
}
signUp(esercizio:{}){
return this.http.post(environment.API_URL+this.auth+this.register,esercizio)
}
addScheda(scheda:{}){
  return this.http.post(environment.API_URL+this.schedaAnagrafica,scheda)
  }
}
