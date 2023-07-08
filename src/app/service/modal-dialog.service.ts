import { Inject, Injectable } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { IDialogData } from '../constants/interface';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {
  
  private errorSubject = new Subject<any>();
  private successSubject = new Subject<any>();

  constructor(private dialog: MatDialog) { }

  openDialog(data:IDialogData): Observable<Object> {
    const dialogRef = this.dialog.open(ConfirmComponent,{
      data: data
    });

    return dialogRef.afterClosed();
  }

  error(errorMessage: string): void {
    this.errorSubject.next({ text: errorMessage });
  }

  success(successMessage: string): void {
    this.successSubject.next({ text: successMessage });
  }

  alertError(): Observable<Object> {
    return this.errorSubject.asObservable();
  }

  alertSuccess(): Observable<Object> {
    return this.successSubject.asObservable();
  }
}
