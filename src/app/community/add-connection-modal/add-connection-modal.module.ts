import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddConnectionModalPageRoutingModule } from './add-connection-modal-routing.module';

import { AddConnectionModalPage } from './add-connection-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddConnectionModalPageRoutingModule
  ],
  declarations: [AddConnectionModalPage]
})
export class AddConnectionModalPageModule {}
