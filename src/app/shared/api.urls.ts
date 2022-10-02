export const API_ENDPOINTS = {
  LOGIN: 'backend/logon',
  USER: {
    ADD: "backend/user/add",
    UPDATE: "backend/api/user/update/guid/",
    UPDATE_PASS: "backend/api/user/updatepass",
    DETAIL: "backend/api/user/detail/guid/",
    DELETE: "backend/api/user/delete/guid/",
    LIST: "backend/api/user/list"
  },
  COMPANY:{
    ADD: "backend/company/add",
    UPDATE: "backend/api/company/update/guid/",
    UPDATE_PASS: "backend/api/company/updatepass",
    DETAIL: "backend/api/company/detail/guid/",
    DELETE: "backend/api/company/delete/guid/",
    LIST: "backend/api/company/list",
    AUTHORIZE:"backend/api/company/authorize/guid/",
    UNAUTHORIZE:"backend/api/company/unauthorize/guid/",
    CEP_CHECK:"backend/api/company/query/cep/",
    CNPJ_CHECK:"backend/api/company/query/cnpj/"
  }
};
