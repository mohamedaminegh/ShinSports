import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LoginService} from './login.service';
@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor(private http: HttpClient , private loginService: LoginService) { }

  categoryForm: FormGroup = new FormGroup({
    $id: new FormControl(null),
    name: new FormControl('', Validators.required),
  });

  playerForm: FormGroup = new FormGroup({
    $id: new FormControl(null),
    name: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    careerStart: new FormControl(new Date()),
    birthDate: new FormControl(new Date()),
    photo: new FormControl('', Validators.required),
    height: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required)
  });

  teamForm: FormGroup = new FormGroup({
    $id: new FormControl(null),
    name: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    league: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    coach: new FormControl('', Validators.required),
    foundationDate: new FormControl(new Date()),
    logo: new FormControl('', Validators.required),
    president: new FormControl('', Validators.required),
  });

  matchForm: FormGroup = new FormGroup({
    $id: new FormControl(null),
    stadium: new FormControl('', Validators.required),
    competition: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    startDate: new FormControl(new Date()),
    category: new FormControl('', Validators.required),
    teamOne: new FormControl('', Validators.required),
    teamTwo: new FormControl('', Validators.required),
  });

logger() {
  if (this.categoryForm.dirty) {
    console.log(this.categoryForm.value);
  } else if (this.playerForm.dirty) {
    console.log(this.playerForm.value);
  } else if (this.teamForm.dirty) {
    console.log(this.teamForm.value);
    }
}

addCategory() {
  const headers = new HttpHeaders()
    // tslint:disable-next-line: max-line-length
    .set('Authorization',this.loginService.authToken)
   // headers.append('Authorization', this.loginService.authToken)
  this.http.post('api/categories', this.categoryForm.value, {headers})
    .subscribe((response) => {
      console.log('repsonse ', response);
    });
}

addPlayer() {
  const headers = new HttpHeaders()
    // tslint:disable-next-line: max-line-length
    .set('Authorization',this.loginService.authToken)
   // headers.append('Authorization', this.loginService.authToken)
    var fd = new FormData();
    fd.append('name',this.playerForm.value.name);
    fd.append('country',this.playerForm.value.country);
    fd.append('category',this.playerForm.value.category);
    fd.append('birthDate',this.playerForm.value.birthDate);
    fd.append('careerStart',this.playerForm.value.careerStart);
    fd.append('weight',this.playerForm.value.weight);
    fd.append('height',this.playerForm.value.height);
    fd.append('age',this.playerForm.value.age);
    fd.append('photo',this.playerForm.value.photo.files[0]);
    this.http.post('api/players', fd, {headers})
    .subscribe((response) => {
      console.log('repsonse ', response);
    });
}

addTeam() {
  const headers = new HttpHeaders()
    // tslint:disable-next-line: max-line-length
    .set('Authorization',this.loginService.authToken)
   // headers.append('Authorization', this.loginService.authToken)
  console.log(this.teamForm.value);
  var fd = new FormData();
  fd.append('name',this.teamForm.value.name);
  fd.append('country',this.teamForm.value.country);
  fd.append('category',this.teamForm.value.category);
  fd.append('foundationDate',this.teamForm.value.foundationDate);
  fd.append('league',this.teamForm.value.league);
  fd.append('coach',this.teamForm.value.coach);
  fd.append('president',this.teamForm.value.president);
  fd.append('logo',this.teamForm.value.logo.files[0]);
  this.http.post('api/teams', fd, {headers})
    .subscribe((response) => {
      console.log('repsonse ', response);
    });
}

addMatch() {
  const headers = new HttpHeaders()
    // tslint:disable-next-line: max-line-length
    .set('Authorization',this.loginService.authToken)
   // headers.append('Authorization', this.loginService.authToken)
   
  const matchFormData = {};
  matchFormData['stadium']=this.matchForm.value.stadium;
  matchFormData['competition']=this.matchForm.value.competition;
  matchFormData['startTime']=this.matchForm.value.startTime;
  matchFormData['startDate']=this.matchForm.value.startDate;
  matchFormData['category']=this.matchForm.value.category;
  matchFormData['teamOne']=this.matchForm.value.teamOne.name;
  matchFormData['teamTwo']=this.matchForm.value.teamTwo.name;
  this.http.post('api/matches', matchFormData, {headers})
    .subscribe((response) => {
      console.log('repsonse ', response);
    });
}
}
