import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/auth.guard";
import { CompanyListComponent } from "../company-list/company-list.component";
import { UsersListComponent } from "../users-list/users-list.component";

export const routes: Routes = [
  { path: 'users-list', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'companies-list', component: CompanyListComponent, canActivate: [AuthGuard] }
];
