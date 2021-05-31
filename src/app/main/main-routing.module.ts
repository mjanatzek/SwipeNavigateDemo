import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { SingleRouterWrapperComponent } from './single/single-router-wrapper/single-router-wrapper.component';
import { RouteAnimationComponent } from './route-animation/route-animation.component';

const routes: Routes = [
  {
    path: '', component: RouteAnimationComponent,
    children: [
      { path: 'all', component: AllComponent },
      { path: 'single/:posY/:posX', component: SingleRouterWrapperComponent },
      { path: '', pathMatch: 'full', redirectTo: 'all' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
