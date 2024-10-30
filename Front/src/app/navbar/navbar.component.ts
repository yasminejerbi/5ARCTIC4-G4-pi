import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  id:number=1;
  constructor(private authService: AuthService,private router: Router,private Act : ActivatedRoute) { }

  ngOnInit() {
    // Abonnez-vous aux changements d'état de connexion

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
   // this.id = this.Act.snapshot.params['id'];
  }
  logout() {
    // Appeler la méthode de déconnexion du service AuthService
    this.authService.setLoggedIn(false);
    this.router.navigate(['login'])
  }
}
