import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  public myForm: FormGroup = this.fb.group({
    email: ['alex@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]]
  });

  login(): void {
    const {email, password} = this.myForm.value;
    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (message) => {
          Swal.fire('Error', message, 'error');
        }
      })
  }

}
