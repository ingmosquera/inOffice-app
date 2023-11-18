import { RouterModule, Routes } from "@angular/router";
import { PublicComponent } from "./public.component";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";

const routes : Routes = [
  { path:'',
    component : PublicComponent,
    children:[
        { path:'home', component: HomeComponent},
    ]
  }  
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[ RouterModule]
})
export class PubilicRoutingModule{}