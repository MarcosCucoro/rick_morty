import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private router: Router) {}

  navigateAndScroll(route: string): void {
    this.router.navigate([route]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
