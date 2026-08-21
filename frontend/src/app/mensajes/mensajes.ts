import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ContactService,
  ContactMessage
} from '../services/contact.service';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './mensajes.html',
  styleUrls: ['./mensajes.css']
})
export class MensajesComponent implements OnInit {

  messages: ContactMessage[] = [];

  loading = true;

  selectedMessage: ContactMessage | null = null;

  replyText = '';

  enviandoRespuesta = false;

  errorMessage = '';

  replyError = '';

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMensajes();
  }

  cargarMensajes(): void {

    this.loading = true;
    this.errorMessage = '';

    this.contactService
      .getMessages()
      .subscribe({

        next: (data) => {

          this.messages = data.sort((a, b) => {

            if (!a.fechaEnvio || !b.fechaEnvio) {
              return 0;
            }

            return (
              new Date(b.fechaEnvio).getTime() -
              new Date(a.fechaEnvio).getTime()
            );
          });

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(
            'Error cargando mensajes:',
            err
          );

          this.messages = [];
          this.loading = false;

          this.errorMessage =
            'No se han podido cargar los mensajes. Inténtalo de nuevo.';

          this.cdr.detectChanges();
        }

      });
  }

  getUnreadCount(): number {

    return this.messages.filter(
      message => !message.leido
    ).length;
  }

  viewMessage(msg: ContactMessage): void {

    this.selectedMessage = msg;

    this.replyText = '';
    this.replyError = '';

    if (!msg.leido && msg.id) {

      this.contactService
        .markAsRead(msg.id)
        .subscribe({

          next: () => {

            msg.leido = true;

            this.cdr.detectChanges();
          },

          error: (err) => {

            console.error(
              'Error marcando mensaje como leído:',
              err
            );
          }

        });
    }

    this.cdr.detectChanges();
  }

  sendReply(): void {

    if (
      !this.selectedMessage?.id ||
      !this.replyText.trim()
    ) {
      return;
    }

    this.enviandoRespuesta = true;
    this.replyError = '';

    this.contactService
      .replyMessage(
        this.selectedMessage.id,
        this.replyText.trim()
      )
      .subscribe({

        next: (updated) => {

          this.selectedMessage!.respuesta =
            updated.respuesta;

          this.selectedMessage!.fechaRespuesta =
            updated.fechaRespuesta;

          const index = this.messages.findIndex(
            message => message.id === updated.id
          );

          if (index !== -1) {
            this.messages[index] = updated;
          }

          this.replyText = '';
          this.enviandoRespuesta = false;

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(
            'Error al responder:',
            err
          );

          this.replyError =
            'No se ha podido enviar la respuesta. Inténtalo de nuevo.';

          this.enviandoRespuesta = false;

          this.cdr.detectChanges();
        }

      });
  }
}