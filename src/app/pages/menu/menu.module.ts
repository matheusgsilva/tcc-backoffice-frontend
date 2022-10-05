import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from '../users-list/users-list.component';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { SpeedDialModule } from 'primeng/speeddial';
import { TooltipModule } from 'primeng/tooltip';
import { routes } from './menu.routing';
import { DocumentFormatPipe } from 'src/app/shared/document-format.pipe';
import { CompanyListComponent } from '../company-list/company-list.component';
import { PetListComponent } from '../pet-list/pet-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToolbarModule,
    ToastModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    InputMaskModule,
    CalendarModule,
    CardModule,
    TagModule,
    ChipModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    SpeedDialModule,
    ChartModule,
    PanelModule,
    TooltipModule
  ],
  declarations: [
    UsersListComponent,
    CompanyListComponent,
    DocumentFormatPipe,
    PetListComponent
  ],
})
export class MenuModule { }
