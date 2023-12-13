import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SpinnerService } from "../../../../services/spinnerService";

@Component({
    selector:'app-spinner',
    styleUrl:'./spinner.component.scss',
    template:`
        <div class="overlay" *ngIf="isLoading$|async" >
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <br><br>
            <h2> Procesando solicitud </h2>
        </div>
    `,
    standalone:true,
    imports:[CommonModule]
})

export class SpinnerComponent{
    isLoading$= this.spinnersvc.isLoading$;
    constructor(private readonly spinnersvc:SpinnerService){}
}