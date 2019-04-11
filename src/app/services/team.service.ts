import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Team} from '../model/team';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TeamService {


  private urlConnection= 'http://localhost:8080/login';

  constructor(private http: HttpClient) { }
  public login(team: Team): Observable<Team> {
    return this.http.post<Team>(this.urlConnection, team, httpOptions);
  }
}
