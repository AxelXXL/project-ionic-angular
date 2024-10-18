import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const userData = sessionStorage.getItem('userData');

    if (userData) {
      // Si hay datos en sessionStorage, permitir el acceso
      return true;
    } else {
      // Si no hay datos, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
