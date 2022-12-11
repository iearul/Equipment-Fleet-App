import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signinForm!: FormGroup;
  isSubmitted: boolean = false;
  onSubmintAlert: boolean = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.authService.loggedIn) {
      this.router.navigate(['/']);
      return;
    }
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onFomSubmit(): void {
    this.isSubmitted = true;
    this.authService.signIn(this.signinForm.value).subscribe((res) => {
      console.log(res);
      if (res.password) {
        this.onSubmintAlert = true;
      }
    },
      (err) => {
        console.log(err);
        this.onSubmintAlert = true;
      }
    );;
  }


}
