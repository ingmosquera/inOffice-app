import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector:'app-buttons',
    templateUrl : './buttons.component.html',
    styleUrl:'./buttons.component.scss',
    standalone:true,
    imports:[MatButtonModule]
})

export class ButtonsComponent{}