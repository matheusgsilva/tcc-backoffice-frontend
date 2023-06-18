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
import { FileUploadModule } from 'primeng/fileupload';
import { routes } from './menu.routing';
import { DocumentFormatPipe } from 'src/app/shared/document-format.pipe';
import { CompanyListComponent } from '../company-list/company-list.component';
import { PetListComponent } from '../pet-list/pet-list.component';
import { FieldsetModule } from 'primeng/fieldset';
import { ImageModule } from 'primeng/image';
import { RatingListComponent } from '../rating-list/rating-list.component';
import { RatingModule } from 'primeng/rating';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {InputSwitchModule} from 'primeng/inputswitch';

@NgModule({
  imports: [
    InputSwitchModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    DividerModule,
    PasswordModule,
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
    TooltipModule,
    FileUploadModule,
    FieldsetModule,
    ImageModule,
    RatingModule
  ],
  declarations: [
    UsersListComponent,
    CompanyListComponent,
    DocumentFormatPipe,
    PetListComponent,
    RatingListComponent
  ],
})
export class MenuModule { }
