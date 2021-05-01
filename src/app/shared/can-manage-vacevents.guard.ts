import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class CanManageVaceventsGuard implements CanActivate {

  isAdmin:boolean = false;

  constructor(private authService:AuthenticationService, private router:Router, private route:ActivatedRoute) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn() && localStorage.getItem("admin") == "1"){
      return true;
    } else {
      window.alert("Sie sind nicht als Admin eingelogged und haben keine Berechtigung für diesen Bereich.");
      this.router.navigate(["../../"], {relativeTo:this.route});
      return false;
    }
  }
}
