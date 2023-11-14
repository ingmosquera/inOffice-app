import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';


@NgModule({
    imports:[
        HttpClientModule,
        RouterModule,
        MatProgressBarModule,
        FlexLayoutModule,
        FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
        MatFormFieldModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatTreeModule
    ],
    declarations:[
        NotFoundComponent

    ],
    exports:[
        HttpClientModule,
        RouterModule,
        NotFoundComponent,
        MatProgressBarModule,
        FlexLayoutModule,
        FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
        MatFormFieldModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatTreeModule
    ]
})

export class SharedModule{
    constructor(){}
}