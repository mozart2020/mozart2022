import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExampleDetailPageRoutingModule } from './example-detail-routing.module';

import { ExampleDetailPage } from './example-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExampleDetailPageRoutingModule
  ],
  declarations: [ExampleDetailPage]
})
export class ExampleDetailPageModule {}
