import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVideoModalPageRoutingModule } from './add-video-modal-routing.module';

import { AddVideoModalPage } from './add-video-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVideoModalPageRoutingModule
  ],
  declarations: [AddVideoModalPage]
})
export class AddVideoModalPageModule {}
