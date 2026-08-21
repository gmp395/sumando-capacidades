import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivityService,
  Activity
} from '../services/activity.service';

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './participantes.html',
  styleUrls: ['./participantes.css']
})
export class ParticipantesComponent implements OnInit {

  activities: (
    Activity & {
      participants?: any[],
      expanded?: boolean
    }
  )[] = [];

  loading = true;

  constructor(
    private activityService: ActivityService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {

    this.loading = true;

    this.activityService
      .getActivities()
      .subscribe({

        next: (data) => {

          this.activities = data
            .sort(
              (a, b) =>
                new Date(a.activityDate).getTime() -
                new Date(b.activityDate).getTime()
            )
            .map(
              activity => ({
                ...activity,
                expanded: false
              })
            );

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(
            'Error cargando actividades:',
            err
          );

          this.loading = false;

          this.cdr.detectChanges();
        }

      });
  }

  toggleParticipants(activity: any): void {

    if (activity.expanded) {

      activity.expanded = false;

    } else if (!activity.participants) {

      this.activityService
        .getEnrollmentsByActivity(activity.id)
        .subscribe({

          next: (enrollments) => {

            activity.participants = enrollments;
            activity.expanded = true;

            this.cdr.detectChanges();
          },

          error: (err) => {

            console.error(
              'Error cargando participantes:',
              err
            );
          }

        });

    } else {

      activity.expanded = true;
    }

    this.cdr.detectChanges();
  }

  getStatusLabel(status: string): string {

    switch (status) {

      case 'inscrito':
        return 'Inscrito';

      case 'asistio':
        return 'Asistió';

      case 'cancelo':
        return 'Canceló';

      case 'lista_espera':
        return 'Lista de espera';

      default:
        return status;
    }
  }
}