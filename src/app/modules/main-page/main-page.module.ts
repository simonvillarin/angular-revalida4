import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './components/hero/hero.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { PostersComponent } from './components/posters/posters.component';
import { FeaturesComponent } from './components/features/features.component';
import { MiniBannerComponent } from './components/mini-banner/mini-banner.component';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HeroComponent,
    PostersComponent,
    FeaturesComponent,
    MiniBannerComponent,
    MainComponent,
  ],
  imports: [CommonModule, MainPageRoutingModule, SharedModule],
  exports: [MainComponent],
})
export class MainPageModule {}
