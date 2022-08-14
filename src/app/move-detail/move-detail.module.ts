import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoveDetailPageRoutingModule } from './move-detail-routing.module';

import { MoveDetailPage } from './move-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoveDetailPageRoutingModule
  ],
  declarations: [MoveDetailPage]
})
export class MoveDetailPageModule {}
