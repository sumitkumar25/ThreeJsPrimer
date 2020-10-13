import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkGraphRoutingModule } from './network-graph-routing.module';
import { GroupLayoutComponent } from './components/group-layout/group-layout.component';


@NgModule({
  declarations: [GroupLayoutComponent],
  imports: [
    CommonModule,
    NetworkGraphRoutingModule
  ]
})
export class NetworkGraphModule { }
