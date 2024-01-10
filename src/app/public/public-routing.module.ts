import { RouterModule, Routes } from "@angular/router";
import { PublicComponent } from "./public.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { ItemComponent } from "../pages/item/item.component";
import { ChangePasswordComponent } from "./changePassword/changePassword.component";
import { ClientDetailComponent } from "../pages/client/client-detail/client-detail.component";
import { ClientListComponent } from "../pages/client/client-list/client-list.component";

const routes : Routes = [
  { path: 'changePassword', component: ChangePasswordComponent },
  { path:'',
    component : PublicComponent,
    children:[
        { path:'home', component: HomeComponent},
        { path:'item', component: ItemComponent},
        { path:'client', component: ClientListComponent},
        { path:'client-detail', component: ClientDetailComponent , data:{activity:"1"}},
    ]
  }  
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[ RouterModule]
})
export class PubilicRoutingModule{}