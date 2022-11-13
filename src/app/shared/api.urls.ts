export const API_ENDPOINTS = {
  LOGIN: {
    LOGIN: 'backend/logon',
    UPDATE_PASS: "backend/update/password"
  },
  USER: {
    ADD: "backend/user/add",
    UPDATE: "backend/api/user/update/guid/",
    CHANGE_PASS: "backend/update/password",
    DETAIL: "backend/api/user/detail/guid/",
    DELETE: "backend/api/user/delete/guid/",
    LIST: "backend/api/user/list"
  },
  COMPANY:{
    ADD: "backend/company/add",
    UPDATE: "backend/api/company/update/guid/",
    CHANGE_PASS: "backend/change/password",
    DETAIL: "backend/api/company/detail/guid/",
    DETAIL_NAME: "backend/company/detail/name/guid/",
    DELETE: "backend/api/company/delete/guid/",
    LIST: "backend/api/company/list",
    AUTHORIZE:"backend/api/company/authorize/guid/",
    UNAUTHORIZE:"backend/api/company/unauthorize/guid/",
    CEP_CHECK:"backend/api/company/query/cep/",
    CNPJ_CHECK:"backend/api/company/query/cnpj/",
    EMAIL_ACCESS:"backend/api/company/send/email/access/guid/"
  },
  PET: {
    ADD: "backend/api/pet/add/companyguid/",
    UPDATE: "backend/api/pet/update/guid/",
    DETAIL: "backend/api/pet/detail/guid/",
    DELETE: "backend/api/pet/delete/guid/",
    LIST: "backend/api/pet/list/companyguid/"
  },
  RATING:{
    DELETE: "backend/api/rating/delete/guid/",
    LIST: "backend/api/rating/list/companyguid/",
    SAVE: "backend/rating/save/companyguid/"
  }
};
