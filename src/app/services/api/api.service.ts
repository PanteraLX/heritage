import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private readonly endpoint: string;

  constructor(private http: HttpClient) {
    this.endpoint = environment.api;
  }

  public fetch<T>(resource: string, options?: any): Observable<T> {
    const url = this.getUrl(resource, options);
    return this.http.get<T>(url);
  }

  public post<T>(resource: string, data: any): Observable<T> {
    const url = this.getUrl(resource);
    return this.http.post<T>(url, data);
  }

  public update<T>(resource: string, data: any): Observable<T> {
    const url = this.getUrl(resource);
    return this.http.put<T>(url, data);

  }

  public delete<T>(resource: string): Observable<T> {
    const url = this.getUrl(resource);
    return this.http.delete<T>(url);
  }

  private getUrl(resource: string, options?: any): string {
    let query = '';

    if (options) {
      const queryProperties: string[] = Object.getOwnPropertyNames(options);
      if (queryProperties.length) {
        query = '?' + queryProperties.map((queryProperty: string): string => queryProperty + '=' + options[queryProperty]).join('&');
      }
    }

    return this.endpoint + resource + '/' + query;
  }
}
