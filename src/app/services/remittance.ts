import { Injectable } from "@angular/core";
import { Remittance } from "../core/modules/remesas/remittance";
import { Observable, of } from "rxjs";


@Injectable({providedIn: 'root'})

export class RemittanceService{

    private getRemittance():Remittance[]{
        return [
            {
                id:1,
                address:"Mi casa",
                applicant:"Applicant",
                createDate:new Date(),
                deliveryDay:new Date(),
                idClient:"1",
                idType:1,
                modifiedDate:new Date(),
                userCreate:"Create",
                userModified:"Modified",
                comments:"",
                closeDay:null,
                status:1
            },
            {
                id:2,
                address:"Mi casa",
                applicant:"Applicant",
                createDate:new Date(),
                deliveryDay:new Date(),
                idClient:"1",
                idType:1,
                modifiedDate:new Date(),
                userCreate:"Create",
                userModified:"Modified",
                comments:"",
                closeDay:null,
                status:2
            },
        ];
    }

    getRemittanceById(id:number):Observable<Remittance[]>{
        const lista = this.getRemittance().filter((data:Remittance)=> data.id ==id);
        return of(lista);
    }
}