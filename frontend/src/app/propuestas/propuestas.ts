import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  ActivityService,
  Activity
} from '../services/activity.service';

@Component({
  selector: 'app-propuestas',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './propuestas.html',
  styleUrls: ['./propuestas.css']
})
export class PropuestasComponent implements OnInit {

  propuestas: Activity[] = [];

  loading = true;

  errorCarga = false;

  esVistaCuadricula = true;

  mensajeExito = '';
  mensajeError = '';

  mostrarConfirmarBorrado = false;

  idTareaABorrar: number | null = null;


  constructor(
    private activityService: ActivityService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.cargarPropuestas();
  }


  cargarPropuestas(): void {

    this.loading = true;
    this.errorCarga = false;

    this.activityService
      .getProposals()
      .subscribe({

        next: (data) => {

          this.propuestas = data;

          this.loading = false;
          this.errorCarga = false;

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(
            'Error cargando propuestas:',
            err
          );

          this.propuestas = [];

          this.loading = false;
          this.errorCarga = true;

          this.cdr.detectChanges();
        }

      });
  }


  aprobarPropuesta(
    tarea: Activity
  ): void {

    this.mensajeError = '';

    const updated: Activity = {
      ...tarea,
      status: 'programada'
    };

    this.activityService
      .updateActivity(
        tarea.id!,
        updated
      )
      .subscribe({

        next: () => {

          this.mensajeExito =
            'Propuesta aprobada y publicada en Voluntariado.';

          this.cargarPropuestas();

          this.cdr.detectChanges();

          setTimeout(() => {

            this.mensajeExito = '';

            this.cdr.detectChanges();

          }, 5000);
        },

        error: (err) => {

          console.error(
            'Error al aprobar propuesta:',
            err
          );

          this.mensajeError =
            'No se ha podido aprobar la propuesta.';

          this.cdr.detectChanges();
        }

      });
  }


  rechazarPropuesta(
    id: number
  ): void {

    this.idTareaABorrar = id;

    this.mostrarConfirmarBorrado = true;

    this.cdr.detectChanges();
  }


  cerrarConfirmarBorrado(): void {

    this.mostrarConfirmarBorrado = false;

    this.idTareaABorrar = null;

    this.cdr.detectChanges();
  }


  confirmarBorrado(): void {

    if (
      this.idTareaABorrar === null
    ) {
      return;
    }

    const id = this.idTareaABorrar;

    this.activityService
      .deleteActivity(id)
      .subscribe({

        next: () => {

          this.mensajeExito =
            'Propuesta rechazada y eliminada.';

          this.cerrarConfirmarBorrado();

          this.cargarPropuestas();

          setTimeout(() => {

            this.mensajeExito = '';

            this.cdr.detectChanges();

          }, 5000);
        },

        error: (err) => {

          console.error(
            'Error al rechazar propuesta:',
            err
          );

          this.mensajeError =
            'No se ha podido rechazar la propuesta.';

          this.cerrarConfirmarBorrado();

          this.cdr.detectChanges();
        }

      });
  }


  getCategoryLabel(
    category: string
  ): string {

    switch (category) {

      case 'social':
        return 'Acompañamiento e inclusión';

      case 'ambiental':
        return 'Ocio inclusivo';

      case 'educativa':
        return 'Apoyo educativo';

      case 'salud':
        return 'Autonomía y bienestar';

      default:
        return category;
    }
  }
}