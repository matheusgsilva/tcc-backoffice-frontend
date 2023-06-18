import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api/selectitem';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ResponseAPI } from 'src/app/shared/response.model';
import { Company } from '../company-list/company.model';
import { CompanyService } from '../company-list/company.service';
import { Rating } from './rating.model';
import { RatingService } from './rating.service';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RatingListComponent implements OnInit {

  loading = false;
  filter: string = "";

  rating: Rating = new Rating();

  selectedRatings: Rating[] = [];

  ratings: Rating[] = [];

  companies: SelectItem[] = [];
  selectedCompany: string = "";

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private ratingService: RatingService, private companyService: CompanyService) { }

  async ngOnInit() {
    await this.companyService.list().toPromise().then(response => {
      ((response as ResponseAPI).data as Company[] || []).forEach(item => {
        this.companies.push({ value: item.guid, label: item.name });
      })
    });
    this.selectedCompany = this.companies.length > 0 ? this.companies[0].value : "";
    this.list();
  }

  list() {
    this.loading = true;
    this.ratingService.list(this.selectedCompany).subscribe(response => {
      this.ratings = (response as ResponseAPI).data as Rating[] || [];
      this.loading = false;
    });
  }

  deleteSelectedRatings() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir as avaliações selecionadas?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        from(this.selectedRatings).pipe(
          switchMap((value) => this.ratingService.delete(value.guid)),
          tap(() => this.selectedRatings = [])
        ).subscribe((response) => {
          this.getMessage((response as ResponseAPI).code);
        });
      }
    });
  }

  deleteRating(rating: Rating) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir a avaliação?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ratingService.delete(rating.guid).subscribe(response => {
          this.getMessage((response as ResponseAPI).code);
        });
      }
    });
  }

  getMessage(code: number) {
    if (code == 200) {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação realizada!', life: 3000 });
      this.list();
    } else
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Operação não realizada!', life: 3000 });
  }

  clean(dt: any){
    this.filter = '';
    dt.filterGlobal(this.filter, 'contains');
  }
}
