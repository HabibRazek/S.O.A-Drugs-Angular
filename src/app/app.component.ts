import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  router: any;
  constructor(public authService: AuthService) {}
  title = 'TP5';

  onlogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.authService.loadToken();
    if (this.authService.getToken()==null ||
        this.authService.isTokenExpired())
          this.router.navigate(['/login']);

  }

  onLogout(){
    this.authService.logout();
  }
  }

