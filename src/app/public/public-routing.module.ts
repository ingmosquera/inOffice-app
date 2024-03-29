import { RouterModule, Routes } from "@angular/router";
import { PublicComponent } from "./public.component";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { ItemComponent } from "../pages/item/item.component";
import { ChangePasswordComponent } from "./changePassword/changePassword.component";
import { ClientDetailComponent } from "../pages/client/client-detail/client-detail.component";
import { ClientListComponent } from "../pages/client/client-list/client-list.component";
import { LoadFileConfigComponent } from "../pages/config-load-file/file-config/file-config.component";
import { CaptureConfigComponent } from "../pages/capture/capture-config/capture-config.component";
import { LoadFileListComponent } from "../pages/config-load-file/file-list/file-list.component";
import { CaptureListComponent } from "../pages/capture/capture-list/capture-list.component";
import { RemittanceDetailComponent } from "../pages/remittance/remittance-detail/remittance-detail.component";
import { RemittanceListComponent } from "../pages/remittance/remittance-list/remittance-list.component";
import { CaptureDataComponent } from "../pages/capture/capture-data/capture-data.component";
import { InventoryArchivingComponent } from "../pages/inventory/inventory-archiving/inventory-archiving.component";
const routes : Routes = [
  { path: 'changePassword', component: ChangePasswordComponent },
  { path:'',
    component : PublicComponent,
    children:[
        { path:'home', component: HomeComponent},
        { path:'item', component: ItemComponent},
        { path:'client', component: ClientListComponent},
        { path:'client-detail', component: ClientDetailComponent,data: { dataclient: {} }},
        { path:'load-file', component: LoadFileListComponent},
        { path:'load-file-detail', component: LoadFileConfigComponent,data: { dataclient: {} }},
        { path:'capture-list', component: CaptureListComponent},
        { path:'capture-detail', component: CaptureConfigComponent,data: { dataclient: {} }},
        { path:'data-capture', component: CaptureDataComponent},
        { path:'remittance-list', component: RemittanceListComponent},
        { path:'remittance-detail', component: RemittanceDetailComponent,data: { dataclient: {} }},
        { path:'inventory-archiving', component: InventoryArchivingComponent},
    ]
  }  
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[ RouterModule]
})
export class PubilicRoutingModule{}