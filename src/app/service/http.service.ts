import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  domain: string = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  httpGet<T>(method: string, data: any, autoLoader: boolean = true): Observable<T> {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('Loader', autoLoader.toString());
    //headers = headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    return this.http.get<T>(this.domain + method, { headers: headers, params: data });
  }

  httpGetPromise(method: string, data: any, autoLoader: boolean = true) {
    var headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('Loader', autoLoader.toString());
    //headers = headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    let promise = new Promise((resolve, reject) => {
      this.http.get(this.domain + method, { params: data })
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          }
        );
    });
    return promise;
  }

  httpPost<T>(method: string, data: any, autoLoader: boolean = true): Observable<T[]> {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Loader', autoLoader.toString()) };
    return this.http.post<T[]>(this.domain + method, data, config);
  }

  httpPostPromise(method: string, data: any, autoLoader: boolean = true) {
    const config = { headers: new HttpHeaders().set('Content-Type', 'application/json').set('Loader', autoLoader.toString()) };
    let promise = new Promise((resolve, reject) => {
      this.http.post(this.domain + method, data, config)
        .toPromise()
        .then(
          res => { // Success
            resolve(res);
          }
        );
    });
    return promise;
  }

  httpPostFormData<T>(method: string, data: FormData, autoLoader: boolean = true): Observable<T[]> {
    const config = { headers: new HttpHeaders().set('Loader', autoLoader.toString()) };
    return this.http.post<T[]>(this.domain + method, data, config);
  }
}
