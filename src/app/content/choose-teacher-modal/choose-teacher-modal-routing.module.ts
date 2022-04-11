import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseTeacherModalPage } from './choose-teacher-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseTeacherModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseTeacherModalPageRoutingModule {}
