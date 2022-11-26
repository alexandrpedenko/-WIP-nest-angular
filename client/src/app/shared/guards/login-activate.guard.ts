import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "@auth/services/auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.authService.loggedInUser.value) {
      this.router.navigate(['auth/login']);
    }
    return true;
  }
}
