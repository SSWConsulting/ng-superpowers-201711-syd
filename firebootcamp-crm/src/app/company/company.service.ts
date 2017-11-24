import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from "rxjs/operators/catchError";
import { EmptyObservable } from 'rxjs/observable/EmptyObservable'
import { environment } from "../../environments/environment";

@Injectable()
export class CompanyService {

  private API_BASE : string;
  constructor(private httpClient: HttpClient) {
    this.API_BASE = environment.API_BASE;
  }

  getCompanies(): Observable<Company[]>{
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(catchError(this.errorHandler))
  }

  deleteCompany(companyId: number): Observable<Company>{
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`)
  }

  addCompany(company: Company){
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company,
     {headers: new HttpHeaders().set('content-type', 'application/json')})
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(
      `${this.API_BASE}/company/${company.id}`, company,
      { headers: new HttpHeaders().set('content-type', 'application/json') }
    );
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`);
  }

  errorHandler(error: Error): Observable<Company[]>{
    // Implement your error handling here
    console.error("My Custom error handling", error);
    return new EmptyObservable();
  }


}
