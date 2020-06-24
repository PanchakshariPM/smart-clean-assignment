import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Property Declarations.
  loginForm: FormGroup;

  constructor(
    public router: Router,
    private toastr: ToastrService
  ) { this.inintializeFormGroup() }

  ngOnInit() { }

  inintializeFormGroup() {
    this.loginForm = new FormGroup({
      emailId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  login() {
    if (this.loginForm.valid && this.loginForm.value.emailId === 'admin@smartclean.in' && this.loginForm.value.password === 'smartclean') {
      this.router.navigate(['/home/tabular-view'])
      this.toastr.success('Logged in successfully.', '')
    } else this.toastr.error('Invalid credentials.', '')
  }


}
