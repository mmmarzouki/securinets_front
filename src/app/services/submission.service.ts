import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Team} from '../model/team';
import {Observable} from 'rxjs';
import {Submission} from '../model/submission';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  private url= 'http://localhost:8080/submission/';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Submission[]> {
    return this.http.get<Submission[]>(this.url);
  }
  public findByTeam(id: number): Observable<Submission[]> {
    return this.http.get<Submission[]>(this.url + id);
  }
}
