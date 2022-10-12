export class Company {
  guid: string = "";
  name: string = "";
  email: string = "";
  document: string = "";
  phone: string = "";
  password: string = "";
  country: string = "";
  street: string = "";
  numberAddress: string = "";
  cep: string = "";
  district: string = "";
  city: string = "";
  uf: string = "";
  description: string = "";
  permission: string = "";
  photo1: string = "";
}

export class CnpjResponse {
  cnpj_raiz!: string;
  razao_social!: string;
  atualizado_em!: Date;
  estabelecimento!: Estabelecimento;
}

class Estabelecimento {
  cnpj!: string;
  cnpj_raiz!: string;
  cnpj_ordem!: string;
  cnpj_digito_verificador!: string;
  tipo!: string;
  nome_fantasia!: string;
  situacao_cadastral!: string;
  data_situacao_cadastral!: string;
  data_inicio_atividade!: string;
  logradouro!: string;
  bairro!: string;
  email!: string;
}

export class CepResponse {
  cep!: string;
  logradouro!: string;
  bairro!: string;
  localidade!: string;
  uf!: string;
  ddd!: string;
}
