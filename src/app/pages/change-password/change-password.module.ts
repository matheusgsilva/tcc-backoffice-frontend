import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePassowordRoutingModule } from './change-password.routing.module';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    CardModule,
    ChangePassowordRoutingModule,
    ButtonModule,
    ToastModule,
    DividerModule,
    PasswordModule
  ],
  declarations: [
    ChangePasswordComponent
  ],
})
export class ChangePasswordModule {}
