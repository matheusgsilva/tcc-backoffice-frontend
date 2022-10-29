import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ResponseAPI } from 'src/app/shared/response.model';
import { Company } from '../company-list/company.model';
import { CompanyService } from '../company-list/company.service';
import { RatingService } from './rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RatingComponent implements OnInit {

  displayCredentialsDialog: boolean = false;
  messageCredentialsDialogTitle: string = "Confirmação de Credenciais de Usuário";

  companyguid: string | any;
  companyname: string | any;

  classification: number = 0;

  form = this.fb.group({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
    classification: new FormControl(0, [Validators.required])
  });

  constructor(private messageService: MessageService, private fb: FormBuilder, private ratingService: RatingService, private companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.companyguid = this.route.snapshot.queryParamMap.get("companyguid");
    this.companyService.detailName(this.companyguid).subscribe((response => {
      this.companyname = ((response as ResponseAPI).data as Company)?.name;
    }));
  }

  save() {
    this.ratingService.save(this.form.getRawValue(), this.companyguid)
      .subscribe((response) => {
        this.displayCredentialsDialog = false;
        if((response as ResponseAPI).code == 200){
          this.messageService.add({ severity: 'success', summary: 'Operação realizada com sucesso!', detail: 'Sua avaliação foi registrada com sucesso.', life: 3000 });
          this.classification = 0;
        } else if ((response as ResponseAPI).msg == "COMPANY_NOT_FOUND"){
          this.messageService.add({ severity: 'error', summary: 'Operação não foi realizada!', detail: 'Organização não encontrada.', life: 3000 });
        } else if ((response as ResponseAPI).msg == "USER_NOT_FOUND"){
          this.messageService.add({ severity: 'error', summary: 'Operação não foi realizada!', detail: 'Usuário não encontrado.', life: 3000 });
        } else {
          this.errorMessage();
        }
      },
        () => {
          this.errorMessage();
          this.displayCredentialsDialog = false;
        });
  }

  errorMessage() {
    this.messageService.add({ severity: 'error', summary: 'Operação não foi realizada!', detail: 'A avalização não foi inserida.', life: 3000 });
  }

  openDialog(){
    this.form.reset();
    this.form.get("companyguid")?.setValue(this.companyguid);
    this.form.get("classification")?.setValue(this.classification);
    this.displayCredentialsDialog = true;
  }
}
