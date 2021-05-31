import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SingleComponent } from './single/single.component';
import { AllComponent } from './all/all.component';
import { SingleRouterWrapperComponent } from './single/single-router-wrapper/single-router-wrapper.component';
import { RouteAnimationComponent } from './route-animation/route-animation.component';

@NgModule({
  declarations: [SingleComponent, AllComponent, SingleRouterWrapperComponent, RouteAnimationComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  providers: [
  ]
})
export class MainModule { }
