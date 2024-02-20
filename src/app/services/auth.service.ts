import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthGuard } from "../core/auth.guard";

@Injectable({
  providedIn: 'root'
})


export class AuthService{

public isAuthenticated:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

constructor(private authGuard:AuthGuard){}

authenticateUser(bool:boolean){
this.authGuard.authenticateUser(bool)
this.isAuthenticated.next(bool);
}

}
