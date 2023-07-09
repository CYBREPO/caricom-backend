import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../service/loader.service';
declare var $: any;
import { Router } from '@angular/router';
import { map, filter, tap } from 'rxjs/operators';
import { ModalDialogService } from '../service/modal-dialog.service';
import { UserInfoService } from '../service/user-info.service';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {


    constructor( private loaderService: LoaderService,private modalDialogService: ModalDialogService,
        private router: Router, private userInfoService: UserInfoService) {
    }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.userInfoService.getLoggedInUser();
        var autoLoader = request.headers.get('Loader');
        if (autoLoader == 'true') {
            this.loaderService.display(true);
        }
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request).pipe(tap(event => {
            // Intercept the response and show the notification accordingly.
            if (event instanceof HttpResponse) {
                // Check body.Message with undefined to verify the property
                // exists in returned response.
                if (event.body.message !== undefined && event.body.message !== '' && event.body.message !== null) {
                    if (event.body.success === true) {
                        this.modalDialogService.success(event.body.message);
                    } else {
                        this.modalDialogService.error(event.body.message);
                    }
                }
                if (autoLoader == 'true') {
                    this.loaderService.display(false);
                }

                if (event.body.Code !== undefined && event.body.Code == 401) {
                    localStorage.removeItem('currentUser');
                    this.router.navigate(['account/login'], { queryParams: { returnUrl: this.router.url } });
                }
                if (event.body.Code !== undefined && event.body.Code == 422) {
                    this.loaderService.display(false);
                }
            }
            return event;
        }));
    }
}
