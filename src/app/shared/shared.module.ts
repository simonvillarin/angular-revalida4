import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, CardComponent, FooterComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [RouterModule, HeaderComponent, CardComponent, FooterComponent],
})
export class SharedModule {}
