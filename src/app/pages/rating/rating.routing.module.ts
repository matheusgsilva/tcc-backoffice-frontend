import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { RatingComponent } from "./rating.component";

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '', component: RatingComponent
            },
        ])
    ],
    exports: [RouterModule]
})
export class RatingRoutingModule {
}
