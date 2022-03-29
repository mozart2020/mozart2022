import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVideoModalPage } from './add-video-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddVideoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVideoModalPageRoutingModule {}
