import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private auth: AuthService, private route: Router) { }

  canActivate(route, state: RouterStateSnapshot){
    //Returning Observable<boolean>

     return this.auth.user$.map(user=>{
      if(user){
     //   console.log(user)
        return true
      } 
      else{
     //   console.log("in can")
        this.route.navigate(['/login'],{ queryParams:{ returnUrl: state.url}});
        return false
      }
      
    })
  }

}
