import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from '../Models/match';
import { LoginService } from './login.service';
export interface Entity {
  date: Date;
  id: Number;
  entity: {
    _id: Number;
  }
}
export interface Follow {
  date: Date;
  id: Number;
  match: {
    _id: Number;
  }
}
@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor(private http: HttpClient,private loginService: LoginService) {
    }
   subscribeTeam(id: number) {
    const headers = new HttpHeaders()
    .set('Authorization',this.loginService.authToken)
    return this.http.post('api/teams/follow/' + id, null,{headers}) ;
  }
  subscribePlayer(id: number) {
    const headers = new HttpHeaders()
    .set('Authorization',this.loginService.authToken)
    return this.http.post('api/players/follow/' + id, null,{headers}) ;
  }
  subscribeMatch(id: number) {
    const headers = new HttpHeaders()
    .set('Authorization',this.loginService.authToken)
    return this.http.post('api/matches/follow/' + id, null,{headers}) ;
  }
  
  getInterestList(): Observable<Entity[]> {
    const headers = new HttpHeaders()
    .set('Authorization',this.loginService.authToken)
    return this.http.get<Entity[]>('api/users/interest',{headers}) ;
  }
  
  getMatchesFollowed(): Observable<Follow[]>{
    const headers = new HttpHeaders()
    .set('Authorization',this.loginService.authToken)
    return this.http.get<Follow[]>('api/users/follow',{headers}) ;
  }
  
}
