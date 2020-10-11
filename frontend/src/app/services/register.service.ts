import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $id: new FormControl(null),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password2: new FormControl('', [Validators.required, Validators.minLength(8)]),
    gender: new FormControl('0'),
    avatar: new FormControl(''),
    admin: new FormControl(false)
  });

  initializeFormGroup() {
    this.form.setValue({
    $id: null,
    username: '',
    email: '',
    password: '',
    password2: '',
    gender: '0',
    avatar: '',
    admin: false
  })
  }

  logger() {
    console.log(this.form.value);
  }
}
