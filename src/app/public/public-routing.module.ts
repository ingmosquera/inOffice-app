import { RouterModule, Routes } from "@angular/router";
import { PublicComponent } from "./public.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { ItemComponent } from "../pages/item/item.component";

const routes : Routes = [
  { path:'',
    component : PublicComponent,
    children:[
        { path:'home', component: HomeComponent},
        { path:'item', component: ItemComponent},
    ]
  }  
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[ RouterModule]
})
export class PubilicRoutingModule{}