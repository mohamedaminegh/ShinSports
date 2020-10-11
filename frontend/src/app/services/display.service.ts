import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import {Player} from '../Models/player'
import {Team} from '../Models/team'
import {Match} from '../Models/match'
import {Category} from '../Models/category'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  constructor(private http: HttpClient) {
   }
  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>('api/players/' + id) ;
  }
  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>('api/teams/' + id) ;
  }
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>('api/teams/') ;
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('api/categories/') ;
  }
  getPopularMatches(): Observable<Match[]>{
    return this.http.get<Match[]>('api/matches/popular') ;
  }
  getRecentMatches(): Observable<Match[]>{
    return this.http.get<Match[]>('api/matches/date') ;
  }
  getMatchesByCategory(name: String): Observable<Match[]>{
    return this.http.get<Match[]>('api/matches/category/'+ name) ;
  }
  getMatchesByTeam(id: Number): Observable<Match[]>{
    return this.http.get<Match[]>('api/matches/team/'+ id) ;
  }
}
