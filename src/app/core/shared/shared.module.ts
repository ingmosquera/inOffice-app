import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
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
import { MatTableModule} from '@angular/material/table';
import { CommonModule } from "@angular/common";
import { MatPaginatorModule,MatPaginatorIntl } from "@angular/material/paginator";
import { MatPaginatorIntEs } from "../helpers/matPaginatorIntEs";
import { MatDividerModule } from '@angular/material/divider';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';

import { SpinnerComponent } from "./components/spinner/spinner.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { TableComponent } from "./components/table/table.component";
import { ButtonsComponent } from "./components/buttons/buttons.component";
import { DialogOverViewComponent } from "./components/dialog-overview/dialog-overview.component";

@NgModule({
    imports:[
        HttpClientModule,
        RouterModule,
        MatProgressBarModule,
        FlexLayoutModule,
        FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatTreeModule,
        ButtonsComponent,
        TableComponent,
        CommonModule,
        MatPaginatorModule,
        MatDividerModule,
        MatDialogModule,
        DialogComponent,
        DialogOverViewComponent,
        MatSortModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatSelectModule,
        MatRadioModule,
        MatTabsModule,
        SpinnerComponent,
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
        FormsModule, MatInputModule, ReactiveFormsModule,
        MatFormFieldModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatTreeModule,
        ButtonsComponent,
        MatTableModule,
        TableComponent,
        CommonModule,
        MatPaginatorModule,
        MatDividerModule,
        MatDialogModule,
        DialogComponent,
        DialogOverViewComponent,
        MatSortModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatSelectModule,
        MatRadioModule,
        MatTabsModule,
        SpinnerComponent,
    ],
    providers:[
        { provide: MatPaginatorIntl, useClass:MatPaginatorIntEs },
    ],
})

export class SharedModule{
    constructor(){}
}