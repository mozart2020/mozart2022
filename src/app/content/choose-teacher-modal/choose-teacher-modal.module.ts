import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseTeacherModalPageRoutingModule } from './choose-teacher-modal-routing.module';

import { ChooseTeacherModalPage } from './choose-teacher-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseTeacherModalPageRoutingModule
  ],
  declarations: [ChooseTeacherModalPage]
})
export class ChooseTeacherModalPageModule {}
