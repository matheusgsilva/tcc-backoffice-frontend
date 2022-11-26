import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RatingComponent } from './rating.component';
import { RatingRoutingModule } from './rating.routing.module';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    RatingModule,
    CardModule,
    RatingRoutingModule,
    ButtonModule,
    ToastModule
  ],
  declarations: [
    RatingComponent
  ],
})
export class RatingUserModule {}
