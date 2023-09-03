export class Pet{
  gender!: any;
  typePet!: any;
  description!: string;
  size!: any;
  age!: string;
  birthDate!: string;
  breed!: any;
  vaccines!: any[];
  color!: string;
  photo1!: string;
  photo2!: string;
  photo3!: string;
  photo4!: string;
  company!: string;
  companyGuid!: string;
  guid!: string;
  identification!: string;
  imageVerified: boolean = false;
  imageConfidence!: string;
  imageResult!: string;
}

export class ImagePredict {
  confidence!: string;
  result!: string;
}
