import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isCollapsed: boolean = false;
  user!: {email: string, isLoggedIn: boolean};

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.user = this.authService.loggedIn;
  }

  onLogout(): void {
    this.authService.signOut();
    this.router.navigate(['signIn']);
  }

}
