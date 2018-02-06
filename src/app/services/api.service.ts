import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({'Accept':'application/json', 'Content-Type':'application/json'})
};

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { 
  }

  get(url): any {
    this.http.get(url, httpOptions)
    .toPromise()
    .then(response => {
      if (response.success == false) {
        alert('error!');
        return null;
      }
      return response.data;
    });
  }
  
  post(url, body): any {
    this.http.post(url, body, httpOptions)
    .toPromise()
    .then(response => {
      if (respose.success == false {
        alert('error!');
        return null;
      }
      return response.data;
    });
  }

  put(url, body): any {
    this.http.put(url, body, httpOptions)
    .toPromise()
    .then(response => {
      if (response.success == false {
        alert('error!');
        return null;
      }
      return response.data;
    });
  }

  delete(url): any {
    this.http.delete(url, httpOptions)
    .toPromise()
    .then(response => {
      if (response.success == false {
        alert('error!');
        return null;
      }
      return response.data;
    });
  }
  
}
