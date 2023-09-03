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

  dogVaccines = [
    { name: "V8 (Polivalente)", code: "V8" },
    { name: "V10 (Polivalente)", code: "V10" },
    { name: "Raiva", code: "Raiva" },
    { name: "Tosse dos Canis (Traqueobronquite)", code: "TosseCanis" },
    { name: "Leishmaniose", code: "Leishmaniose" },
    { name: "Giardíase", code: "Giardíase" },
    { name: "Leptospirose", code: "Leptospirose" },
    { name: "Parvovirose", code: "Parvovirose" },
    { name: "Cinomose", code: "Cinomose" },
    { name: "Coronavírus Canino", code: "Coronavírus" }
  ];

  catVaccines = [
    { name: "Tríplice Felina (FVRCP)", code: "TrípliceFelina" },
    { name: "Quádrupla Felina", code: "QuádruplaFelina" },
    { name: "Raiva", code: "Raiva" },
    { name: "Leucemia Felina (FeLV)", code: "LeucemiaFelina" },
    { name: "Imunodeficiência Felina (FIV)", code: "ImunodeficiênciaFelina" },
    { name: "Peritonite Infecciosa Felina (PIF)", code: "PeritoniteInfecciosa" },
    { name: "Clamidiose", code: "Clamidiose" }
  ];

  dogBreeds = [
    { name: "SRD (Sem Raça Definida)", code: "SRD" },
    { name: "Akita", code: "Akita" },
    { name: "Rottweiler", code: "Rottweiler" },
    { name: "Dachshund (Teckel)", code: "Dachshund" },
    { name: "Beagle", code: "Beagle" },
    { name: "Shiba Inu", code: "ShibaInu" },
    { name: "Poodle", code: "Poodle" },
    { name: "Pit Bull Terrier", code: "PitBull" },
    { name: "Pug", code: "Pug" },
    { name: "Chihuahua", code: "Chihuahua" },
    { name: "Shar-Pei", code: "SharPei" },
    { name: "Pinscher", code: "Pinscher" },
    { name: "Labrador Retriever", code: "Labrador" },
    { name: "Golden Retriever", code: "Golden" },
    { name: "Bulldog", code: "Bulldog" }
  ];

  catBreeds = [
    { name: "SRD (Sem Raça Definida)", code: "SRD" },
    { name: "Persa", code: "Persa" },
    { name: "Maine Coon", code: "MaineCoon" },
    { name: "Siamese", code: "Siamese" },
    { name: "Bengal", code: "Bengal" },
    { name: "Sphynx", code: "Sphynx" },
    { name: "Ragdoll", code: "Ragdoll" },
    { name: "British Shorthair", code: "BritishShorthair" },
    { name: "Scottish Fold", code: "ScottishFold" },
    { name: "Abyssinian", code: "Abyssinian" },
    { name: "Oriental", code: "Oriental" },
    { name: "Siberian", code: "Siberian" }
  ];

  typePet: any[] = [
    { code: "Cachorro", name: "Cachorro" },
    { code: "Gato", name: "Gato" }
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

    this.pet.gender = this.gender.find(g => g.code == pet.gender);
    this.pet.typePet = this.typePet.find(t => t.code == pet.typePet);
    this.pet.size = this.size.find(s => s.code == pet.size);

    if (pet.typePet == "Cachorro") {
      this.pet.breed = this.dogBreeds.find(b => b.code == pet.breed) || this.pet.breed;
      this.pet.vaccines = this.dogVaccines.filter(vaccine => pet.vaccines.includes(vaccine.code));
    } else {
      this.pet.breed = this.catBreeds.find(b => b.code == pet.breed) || this.pet.breed;
      this.pet.vaccines = this.catVaccines.filter(vaccine => pet.vaccines.includes(vaccine.code));
    }

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
      this.petService.add({ ...this.pet, gender: this.pet.gender.code, breed: this.pet.breed.code, typePet: this.pet.typePet.code, size: this.pet.size.code, vaccines: this.pet?.vaccines?.map(vaccine => vaccine.code) }, this.selectedCompany).subscribe(response => {
        this.getMessage((response as ResponseAPI).code);
      }, () => this.getMessage(404));
    else
      this.petService.update({ ...this.pet, gender: this.pet.gender.code, breed: this.pet.breed.code, typePet: this.pet.typePet.code, size: this.pet.size.code, vaccines: this.pet?.vaccines?.map(vaccine => vaccine.code) }, this.pet.guid).subscribe(response => {
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

  findNameTypePet(typePet: string) {
    return this.typePet.filter(t => t.code == typePet)[0]?.name;
  }

  findNameSize(size: string) {
    return this.size.filter(t => t.code == size)[0]?.name;
  }

  clean(dt: any) {
    this.filter = '';
    dt.filterGlobal(this.filter, 'contains');
  }
}
