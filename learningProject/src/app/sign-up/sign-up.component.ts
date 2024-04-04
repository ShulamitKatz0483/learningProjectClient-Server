import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private userService:UserService,private router: Router,
    ) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      level: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Signing up...');
      this.userService.addUser(this.signupForm.value).subscribe(
        (res) => {
          console.log('User added successfully:', res);
          this.signupForm.reset();
        },
        (error) => {
          console.error('Error adding user:', error);
          alert("Email or phoneNumber registered in the system" )
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  toLogin(){
    this.router.navigate(['/login']);

  }
  
  
}
