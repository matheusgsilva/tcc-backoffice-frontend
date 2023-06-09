import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService, ConfirmationService } from 'primeng/api';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ResponseAPI } from 'src/app/shared/response.model';
import { CepResponse, CnpjResponse, Company } from './company.model';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CompanyListComponent implements OnInit {

  companyDialog: boolean = false;
  validationDialog: boolean = false;
  companyImageDialog: boolean = false;

  filter: string = "";

  companies: Company[] = [];

  company: Company = new Company();

  selectedCompanies: Company[] = [];

  cepResponse: CepResponse = new CepResponse();

  cnpjResponse: CnpjResponse = new CnpjResponse();

  image1: any;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private companyService: CompanyService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.companyService.list().subscribe(response => this.companies = (response as ResponseAPI).data as Company[] || []);
  }

  openNew() {
    this.company = new Company();
    this.companyDialog = true;
  }

  deleteSelectedCompanies() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir as organizações selecionadas?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        from(this.selectedCompanies).pipe(
          switchMap((value) => this.companyService.delete(value.guid)),
          tap(() => this.selectedCompanies = [])
        ).subscribe((response) => {
          this.getMessage((response as ResponseAPI).code);
        });
      }
    });
  }

  editCompany(company: Company) {
    this.company = { ...company };
    this.companyDialog = true;
  }

  deleteCompany(company: Company) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir a organização: ' + company.name + '?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.companyService.delete(company.guid).subscribe(response => {
          this.getMessage((response as ResponseAPI).code);
        }, () => this.getMessage(404));
      }
    });
  }

  hideDialog() {
    this.companyDialog = false;
    this.validationDialog = false;
  }

  saveCompany() {
    if (this.companies.filter(s => s.guid == this.company?.guid).length == 0)
      this.companyService.add({
        ...this.company, document: this.company?.document.replace("-", "").replace(/\./g, "").replace("/", ""),
        cep: this.company?.cep.replace("-", "").replace(/\./g, "")
      }).subscribe(response => {
        this.getMessage((response as ResponseAPI).code);
      }, () => this.getMessage(404));
    else
      this.companyService.update({
        ...this.company, document: this.company?.document.replace("-", "").replace(/\./g, "").replace("/", ""),
        cep: this.company?.cep.replace("-", "").replace(/\./g, "")
      }, this.company.guid).subscribe(response => {
        this.getMessage((response as ResponseAPI).code);
      }, () => this.getMessage(404));
    this.companyDialog = false;
    this.company = new Company();
  }

  sendEmailPassword(company: Company) {
    this.companyService.changePassword({ email: company.email }).subscribe(response => {
      this.getMessage((response as ResponseAPI).code);
    }, () => this.getMessage(404));
    this.company = new Company();
  }

  async verifyCep(cep: string) {
    await this.companyService.queryCep(cep).toPromise()
      .then(response => {
        if ((response as ResponseAPI).code == 200) {
          this.cepResponse = (response as ResponseAPI).data;
        } else {
          this.messageService.add({
            severity: (response as ResponseAPI).code == 429 ? 'warn' : 'error', summary: 'Erro',
            detail: (response as ResponseAPI).code == 429 ? 'Espere 1 minuto para a próxima consulta!' : 'CEP não encontrado!', life: 30000
          });
        }
      });
  }

  async verifyCnpj(cnpj: string) {
    await this.companyService.queryCnpj(cnpj).toPromise()
      .then(response => {
        if ((response as ResponseAPI).code == 200) {
          this.cnpjResponse = (response as ResponseAPI).data;
        } else {
          this.messageService.add({
            severity: (response as ResponseAPI).code == 429 ? 'warn' : 'error', summary: 'Erro',
            detail: (response as ResponseAPI).code == 429 ? 'Espere 1 minuto para a próxima consulta!' : 'CNPJ não encontrado!', life: 30000
          });
        }
      });
  }

  async validateCompany(company: Company) {
    this.cepResponse = new CepResponse();
    this.cnpjResponse = new CnpjResponse();
    this.company = company;
    await this.verifyCep(company.cep);
    await this.verifyCnpj(company.document);
    if (this.cnpjResponse.cnpj_raiz != undefined && this.cepResponse.cep != undefined)
      this.validationDialog = true;
  }

  authorize() {
    this.companyService.authorize(this.company.guid).subscribe(response => {
      this.getMessage((response as ResponseAPI).code);
    }, () => this.getMessage(404));
    this.validationDialog = false;
    this.company = new Company();
  }

  sendEmailAccess(guid: string) {
    this.companyService.sendEmailAccess(guid).subscribe(response => {
      this.getMessage((response as ResponseAPI).code);
    }, () => this.getMessage(404));
  }

  unauthorize(company: Company) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja remover a permissão da organização: ' + company.name + '?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.companyService.unauthorize(company.guid).subscribe(response => {
          this.getMessage((response as ResponseAPI).code);
        }, () => this.getMessage(404));
      }
    });
  }

  openImageDialog(companyGuid: string) {
    this.company = new Company();
    this.image1 = undefined;
    this.companyImageDialog = true;
    this.companyService.detail(companyGuid).subscribe((response => {
      this.company = ((response as ResponseAPI).data as Company);
      if (this.company.photo1)
        this.image1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.company.photo1);
    }));
  }

  closeImageDialog() {
    this.companyImageDialog = false;
  }

  onUpload(event: any, image: number) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      if (image == 1)
        reader.onload = this.handleReaderLoaded1.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded1(e: any) {
    const image = `data:image/png;base64, ${btoa(e.target.result)}`
    this.company.photo1 = image;
    this.image1 = this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  saveImagesCompany() {
    this.companyService.update({
      ...this.company
    },
      this.company.guid).subscribe(response => {
        this.getMessage((response as ResponseAPI).code);
      }, () => this.getMessage(404));
    this.companyImageDialog = false;
    this.company = new Company();
  }


  getMessage(code: number) {
    if (code == 200) {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação realizada!', life: 3000 });
      this.list();
    } else
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Operação não realizada!', life: 3000 });
  }
}
