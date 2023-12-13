import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler,HttpEvent,HttpInterceptor } from "@angular/common/http";
import { Observable, finalize } from "rxjs";
import { SpinnerService } from "../services/spinnerService";

@Injectable()

export class SpinnerInterceptor implements HttpInterceptor{
    
    constructor(private readonly spinnerService:SpinnerService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerService.show();
        return next.handle(req).pipe(
            finalize(()=> {this.spinnerService.hide()})
        );
    }
}