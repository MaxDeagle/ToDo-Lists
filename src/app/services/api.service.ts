import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, filter, flatMap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({'Accept':'application/json', 'Content-Type':'application/json'})
};

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { 
  }

  get(url): Observable<any> {
    return this.http.get(url, httpOptions)
      .pipe(map(response => {
          return this.handleResponse(response);
      }));

  }
  
  post(url, body): Observable<any> {
    return this.http.post(url, body, httpOptions)
      .pipe(map(response => {
        return this.handleResponse(response);
      }));
  }

  put(url, body): Observable<any> {
    return this.http.put(url, body, httpOptions)
      .pipe(map(response => {
        return this.handleResponse(response);
      }));
  }

  delete(url): Observable<any> {
    return this.http.delete(url, httpOptions)
      .pipe(map(response => {
        return this.handleResponse(response);
      }));
  }

  handleResponse(response): any {
    if (response.success == false) {
      alert('Error');
      return null;
    } 

    return response.data;
  }
  
}
