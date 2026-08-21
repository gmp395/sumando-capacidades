import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { ActivityService } from '../services/activity.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-mis-tareas',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './mis-tareas.html',
  styleUrl: './mis-tareas.css'
})
export class MisTareas implements OnInit {

  misInscripciones: any[] = [];

  loading = true;

  mensajeExito = '';
  mensajeError = '';

  constructor(
    private activityService: ActivityService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarInscripciones();
  }

  cargarInscripciones(): void {

    this.loading = true;

    const user =
      this.authService.currentUser;

    if (!user?.id) {
      this.loading = false;
      return;
    }

    this.activityService
      .getUserEnrollments(user.id)
      .subscribe({

        next: (data) => {

          const ahora =
            new Date();

          /*
           * Mostramos únicamente actividades
           * actuales o futuras.
           */
          this.misInscripciones =
            data.filter(
              insc =>
                !insc.activity?.activityDate ||
                new Date(
                  insc.activity.activityDate
                ) >= ahora
            );

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(
            'Error cargando inscripciones:',
            err
          );

          this.loading = false;

          this.mensajeError =
            'No se han podido cargar tus actividades.';

          this.cdr.detectChanges();

          setTimeout(() => {
            this.mensajeError = '';
            this.cdr.detectChanges();
          }, 3000);
        }

      });
  }

  desapuntarse(
    activityId: number
  ): void {

    const user =
      this.authService.currentUser;

    if (!user?.id) {
      return;
    }

    this.activityService
      .unenroll(
        user.id,
        activityId
      )
      .subscribe({

        next: () => {

          this.cargarInscripciones();

          this.mensajeExito =
            'Tu inscripción se ha cancelado correctamente.';

          this.cdr.detectChanges();

          setTimeout(() => {
            this.mensajeExito = '';
            this.cdr.detectChanges();
          }, 3000);
        },

        error: (err) => {

          console.error(
            'Error al cancelar la inscripción:',
            err
          );

          this.mensajeError =
            'No se ha podido cancelar la inscripción. Inténtalo de nuevo.';

          this.cdr.detectChanges();

          setTimeout(() => {
            this.mensajeError = '';
            this.cdr.detectChanges();
          }, 3000);
        }

      });
  }

  getCategoryLabel(
    category: string
  ): string {

    switch (
      category?.toLowerCase()
    ) {

      case 'social':
        return 'Acompañamiento e inclusión';

      case 'ambiental':
        return 'Ocio inclusivo';

      case 'educativa':
        return 'Apoyo educativo';

      case 'salud':
        return 'Autonomía y bienestar';

      default:
        return category || 'Actividad';
    }
  }

  getStatusLabel(
    status: string
  ): string {

    switch (
      status?.toLowerCase()
    ) {

      case 'inscrito':
        return 'Inscrito';

      case 'asistio':
        return 'Asistencia registrada';

      case 'cancelo':
        return 'Cancelado';

      case 'lista_espera':
        return 'Lista de espera';

      default:
        return status;
    }
  }

  usarImagenAlternativa(
    event: Event
  ): void {

    const imagen =
      event.target as HTMLImageElement;

    imagen.src =
      'images/activities/habilidades-sociales.jpg';
  }
}