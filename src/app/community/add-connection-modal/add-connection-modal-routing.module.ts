import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddConnectionModalPage } from './add-connection-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddConnectionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddConnectionModalPageRoutingModule {}
