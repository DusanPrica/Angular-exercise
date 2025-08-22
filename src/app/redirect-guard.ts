/*import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { CurrentUserService } from './services/current-user.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const currentUrl = route.url.map(segment => segment.path).join('/');
    
    if (this.currentUserService.isLoggedIn()) {
      if (currentUrl !== 'home') {
        this.router.navigate(['/home']);
      }
    } else {
      if (currentUrl !== 'login') {
        this.router.navigate(['/login']);
      }
    }

    return false;
  }
}*/
