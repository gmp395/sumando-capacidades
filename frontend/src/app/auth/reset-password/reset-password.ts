import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {

  token = '';
  newPassword = '';
  confirmPassword = '';

  message = '';

  isError = false;
  isLoading = false;
  success = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.token =
      this.route.snapshot
        .queryParamMap
        .get('token') || '';

    if (!this.token) {

      this.message =
        'El enlace de recuperación no es válido. Solicita uno nuevo.';

      this.isError = true;
    }
  }

  onSubmit(): void {

    this.message = '';
    this.isError = false;

    if (
      this.newPassword !==
      this.confirmPassword
    ) {

      this.message =
        'Las contraseñas no coinciden.';

      this.isError = true;

      return;
    }

    this.isLoading = true;

    this.authService
      .resetPassword(
        this.token,
        this.newPassword
      )
      .subscribe({

        next: (res: any) => {

          this.message =
            res?.message ||
            'Contraseña actualizada correctamente.';

          this.isError = false;
          this.isLoading = false;
          this.success = true;

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },

        error: (err) => {

          console.error(
            'Error al actualizar la contraseña:',
            err
          );

          this.message =
            'No se ha podido actualizar la contraseña. El enlace puede haber caducado o no ser válido.';

          this.isError = true;
          this.isLoading = false;
        }

      });
  }
}