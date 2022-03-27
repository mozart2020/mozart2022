import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExampleDetailPage } from './example-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ExampleDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExampleDetailPageRoutingModule {}
