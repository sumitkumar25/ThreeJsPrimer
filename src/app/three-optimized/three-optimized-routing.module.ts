import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreeOptimizedComponent } from './components/three-optimized/three-optimized.component';


const routes: Routes = [
  {
    path: '',
    component: ThreeOptimizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeOptimizedRoutingModule { }
