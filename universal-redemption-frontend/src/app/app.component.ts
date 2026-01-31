import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 // imports: [RouterOutlet]
})
export class AppComponent {
  title = 'universal-redemption-frontend';

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]); 
  }
}
