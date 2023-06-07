import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-item',
  templateUrl: './orders-item.component.html',
  styleUrls: ['./orders-item.component.scss']
})
export class OrdersItemComponent {

  constructor() {}

  activeTab: string = 'allTab';

  navigateTabs(tabName: string) {
    this.activeTab = tabName;
  }
}
