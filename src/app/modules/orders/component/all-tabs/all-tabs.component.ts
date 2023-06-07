import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-tabs',
  templateUrl: './all-tabs.component.html',
  styleUrls: ['./all-tabs.component.scss']
})
export class AllTabsComponent {
  
  constructor(private router: Router) {}

  goToOrderDetails() {
    return this.router.navigate(['user/order/details']);
  }
}
