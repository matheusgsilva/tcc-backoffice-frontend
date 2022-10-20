import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/shared/auth.guard";
import { CompanyListComponent } from "../company-list/company-list.component";
import { PetListComponent } from "../pet-list/pet-list.component";
import { RatingListComponent } from "../rating-list/rating-list.component";
import { UsersListComponent } from "../users-list/users-list.component";

export const routes: Routes = [
  { path: 'users-list', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'companies-list', component: CompanyListComponent, canActivate: [AuthGuard] },
  { path: 'pets-list', component: PetListComponent, canActivate: [AuthGuard] },
  { path: 'rating-list', component: RatingListComponent, canActivate: [AuthGuard] }
];
