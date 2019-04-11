import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Submission} from '../model/submission';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private urlSubmission= 'http://localhost:8080/submission/';
  private urlReport= 'http://localhost:8080/report/';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Submission[]> {
    return this.http.get<Submission[]>(this.urlSubmission);
  }
  public findByTeam(id: number): Observable<Submission[]> {
    return this.http.get<Submission[]>(this.urlSubmission + id);
  }

  public downloadPDF(id: number ): Observable<any> {
    return this.http.get(this.urlReport + id, {  responseType: 'blob'})
  }
}
