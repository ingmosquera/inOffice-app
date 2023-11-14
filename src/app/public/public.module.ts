import { NgModule } from "@angular/core";
import { PubilicRoutingModule } from "./public-routing.module";
import { SharedModule } from "../core/shared/shared.module";
import { PublicComponent } from "./public.component";
import { LoginComponent } from "./login/login.component";
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from "./home/home.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FooterComponent } from "./footer/footer.component";

@NgModule({
    imports:[
        PubilicRoutingModule,
        SharedModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatFormFieldModule
    ],
    declarations:[
        PublicComponent,
        HomeComponent,
        LoginComponent,
        FooterComponent
    ]
})

export class PublicModule{
    constructor(){}
}