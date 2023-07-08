import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  private _data: any = null;
  constructor() { }

  setData(data: any): void {
    this._data = data;
  }

  getData(): any {
    return this._data;
  }
}
