import {
  Component,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {

  email = '';
  message = '';

  isError = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  onSubmit(): void {

    this.isLoading = true;
    this.message = '';
    this.isError = false;

    this.authService
      .forgotPassword(this.email)
      .subscribe({

        next: (res: any) => {

          this.message =
            res?.message ||
            'Si el correo está registrado, recibirás un enlace de recuperación.';

          this.isError = false;
          this.isLoading = false;

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(
            'Error al solicitar recuperación de contraseña:',
            err
          );

          this.message =
            'No se ha podido procesar la solicitud. Inténtalo de nuevo más tarde.';

          this.isError = true;
          this.isLoading = false;

          this.cdr.detectChanges();
        }

      });
  }
}