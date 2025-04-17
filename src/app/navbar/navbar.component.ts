import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  url='';
  private publicRoutes = ['/home', '/login', '/signup', '/contactUs'];

  constructor(private router:Router) {
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
        console.log(this.url);
      }
    });
  }
  isPublicRoute(): boolean {
    return this.publicRoutes.some(route => this.url.includes(route));
  }
}
