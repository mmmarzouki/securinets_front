import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Submission} from '../model/submission';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
};
const httpOptionDownload = {
  headers: new HttpHeaders({  'responseType': 'blob', 'Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private urlSubmission= 'http://localhost:8080/submission/';
  private urlReport= 'http://localhost:8080/report/';
  private urlSubmit= 'http://localhost:8080/submit/';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Submission[]> {
    return this.http.get<Submission[]>(this.urlSubmission);
  }
  public findByTeam(id: number): Observable<Submission[]> {
    return this.http.get<Submission[]>(this.urlSubmission + id, httpOptions);
  }

  public downloadPDF(id: number ): Observable<any> {
    return this.http.get(this.urlReport + id, httpOptions)
  }
  public submit(form: FormData): Observable<any> {
    return this.http.post(this.urlSubmit, form, httpOptionDownload);
  }
  public judge(submission: Submission): Observable<Submission> {
    return this.http.put<Submission>(this.urlSubmission, submission, httpOptions)
  }
}
