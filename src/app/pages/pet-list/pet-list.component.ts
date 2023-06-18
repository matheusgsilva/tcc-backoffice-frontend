import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ResponseAPI } from 'src/app/shared/response.model';
import { Company } from '../company-list/company.model';
import { CompanyService } from '../company-list/company.service';
import { Pet } from './pet.model';
import { PetService } from './pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class PetListComponent implements OnInit {

  loading = false;
  petDialog: boolean = false;
  petImageDialog: boolean = false;

  filter: string = "";

  pets: Pet[] = [];

  pet: Pet = new Pet();

  selectedPets: Pet[] = [];

  companies: SelectItem[] = [];

  selectedCompany: string = "";

  image1: any;

  gender: any[] = [
    { name: 'Macho', code: 'M' },
    { name: 'Fêmea', code: 'F' }
  ];

  breed: any[] = [
    { name: "SRD", code: "SRD" },
    { name: "Akita", code: "Akita" },
    { name: "Rottweiler", code: "Rottweiler" },
    { name: "Dashing Hound", code: "Dashing Hound" },
    { name: "Beagle", code: "Beagle" },
    { name: "Shiba", code: "Shiba" },
    { name: "Poddle", code: "Poddle" },
    { name: "Pit bull", code: "Pit bull" },
    { name: "Pug", code: "Pug" },
    { name: "Chihuahua", code: "Chihuahua" },
    { name: "Shar-pei", code: "Shar-pei" },
    { name: "Pinscher", code: "Pinscher" }
  ];

  typePet: any[] = [
    { code: "Cachorro", name: "Cachorro" },
    { code: "Gato", name: "Gato" },
    { code: "Passarinho", name: "Passarinho" },
    { code: "Coelho", name: "Coelho" }
  ];

  size: any[] = [
    { code: "pequeno", name: "Pequeno" },
    { code: "medio", name: "Médio" },
    { code: "grande", name: "Grande" }
  ];

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private petService: PetService, private companyService: CompanyService, private sanitizer: DomSanitizer) { }

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
    this.petService.list(this.selectedCompany).subscribe(response => {
      this.pets = (response as ResponseAPI).data as Pet[] || [];
      this.loading = false;
    });
  }

  openNew() {
    this.pet = new Pet();
    this.petDialog = true;
  }

  deleteSelectedPets() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir os pets selecionados?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        from(this.selectedPets).pipe(
          switchMap((value) => this.petService.delete(value.guid)),
          tap(() => this.selectedPets = [])
        ).subscribe((response) => {
          this.getMessage((response as ResponseAPI).code);
        });
      }
    });
  }

  editPet(pet: Pet) {
    this.pet = { ...pet };
    this.pet.gender = this.gender.filter(g => g.code == pet.gender)[0];
    let breed = this.breed.filter(b => b.code == pet.breed);
    this.pet.breed = breed.length > 0 ? breed[0] : this.pet.breed;
    this.pet.typePet = this.typePet.filter(t => t.code == pet.typePet)[0];
    this.pet.size = this.size.filter(t => t.code == pet.size)[0];
    this.petDialog = true;
  }

  deletePet(pet: Pet) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir o pet?',
      header: 'Atenção',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.petService.delete(pet.guid).subscribe(response => {
          this.getMessage((response as ResponseAPI).code);
        });
      }
    });
  }

  hideDialog() {
    this.petDialog = false;
  }

  savePet() {
    if (this.pets.filter(s => s.guid == this.pet?.guid).length == 0)
      this.petService.add({ ...this.pet, gender: this.pet.gender.code, breed: this.pet.typePet.code == "Cachorro" ? this.pet.breed.code : "", typePet: this.pet.typePet.code, size: this.pet.size.code }, this.selectedCompany).subscribe(response => {
        this.getMessage((response as ResponseAPI).code);
      }, () => this.getMessage(404));
    else
      this.petService.update({ ...this.pet, gender: this.pet.gender.code, breed: this.pet.typePet.code == "Cachorro" ? this.pet.breed.code : "", typePet: this.pet.typePet.code, size: this.pet.size.code }, this.pet.guid).subscribe(response => {
        this.getMessage((response as ResponseAPI).code);
      }, () => this.getMessage(404));
    this.petDialog = false;
    this.pet = new Pet();
  }

  openImageDialog(petGuid: string) {
    this.pet = new Pet();
    this.image1 = undefined;
    this.petService.detail(petGuid).subscribe((response => {
      this.pet = ((response as ResponseAPI).data as Pet);
      this.petImageDialog = true;
      if (this.pet.photo1)
        this.image1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.pet.photo1);
    }));
  }

  closeImageDialog() {
    this.petImageDialog = false;
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
    this.pet.photo1 = image;
    this.image1 = this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  saveImagesPet() {
    this.petService.update({
      ...this.pet
    },
      this.pet.guid).subscribe(response => {
        this.getMessage((response as ResponseAPI).code);
      }, () => this.getMessage(404));
    this.petImageDialog = false;
    this.pet = new Pet();
  }

  getMessage(code: number) {
    if (code == 200) {
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Operação realizada!', life: 3000 });
      this.list();
    } else
      this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Operação não realizada!', life: 3000 });
  }

  findNameTypePet(typePet: string){
    return this.typePet.filter(t => t.code == typePet)[0]?.name;
  }

  findNameSize(size: string){
    return this.size.filter(t => t.code == size)[0]?.name;
  }

  clean(dt: any){
    this.filter = '';
    dt.filterGlobal(this.filter, 'contains');
  }
}
