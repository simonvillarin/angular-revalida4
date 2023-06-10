import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  activeTab: string = 'profile';

  navigateTabs(tabName: string) {
    this.activeTab = tabName;
  }
}
