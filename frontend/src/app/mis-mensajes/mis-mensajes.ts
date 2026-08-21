import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ContactService,
  ContactMessage
} from '../services/contact.service';

@Component({
  selector: 'app-mis-mensajes',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './mis-mensajes.html',
  styleUrls: ['./mis-mensajes.css']
})
export class MisMensajesComponent implements OnInit {

  messages: ContactMessage[] = [];

  loading = true;

  selectedMessage: ContactMessage | null = null;

  errorMessage = '';

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMisMensajes();
  }

  cargarMisMensajes(): void {

    this.loading = true;
    this.errorMessage = '';
    this.selectedMessage = null;

    this.contactService
      .getMyMessages()
      .subscribe({

        next: (data) => {

          this.messages = data.sort(
            (a, b) => {

              if (
                !a.fechaEnvio ||
                !b.fechaEnvio
              ) {
                return 0;
              }

              return (
                new Date(b.fechaEnvio).getTime() -
                new Date(a.fechaEnvio).getTime()
              );
            }
          );

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(
            'Error al cargar los mensajes:',
            err
          );

          this.messages = [];

          this.loading = false;

          this.errorMessage =
            'No hemos podido recuperar tus consultas. Comprueba que tu sesión siga activa e inténtalo de nuevo.';

          this.cdr.detectChanges();
        }

      });
  }

  viewMessage(
    msg: ContactMessage
  ): void {

    this.selectedMessage = msg;

    this.cdr.detectChanges();
  }

  closeDetail(): void {

    this.selectedMessage = null;

    this.cdr.detectChanges();
  }

  getInitials(
    name: string
  ): string {

    if (!name) {
      return '--';
    }

    return name
      .split(' ')
      .filter(part => part.length > 0)
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}