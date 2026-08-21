import {
  Component,
  ChangeDetectorRef
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario {

  voluntarioForm: FormGroup;

  diasSemana = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'
  ];

  showSuccessModal = false;
  formError = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {

    this.voluntarioForm = this.fb.group({

      nombre: [
        '',
        Validators.required
      ],

      apellidos: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      telefono: [''],

      fechaNacimiento: [''],

      disponibilidad: this.fb.group({
        Lunes: [false],
        Martes: [false],
        Miércoles: [false],
        Jueves: [false],
        Viernes: [false],
        Sábado: [false],
        Domingo: [false]
      }),

      areaInteres: this.fb.group({
        educacion: [false],
        sanidad: [false],
        medioAmbiente: [false],
        comunidad: [false],
        logistica: [false]
      }),

      otroArea: [''],

      habilidades: ['']

    });
  }

  onSubmit(): void {

    this.formError = '';

    if (!this.voluntarioForm.valid) {

      this.formError =
        'Por favor, revisa el formulario. Hay campos obligatorios o con formato incorrecto.';

      this.voluntarioForm.markAllAsTouched();

      return;
    }

    const formValue =
      this.voluntarioForm.value;

    const fullName =
      `${formValue.nombre} ${formValue.apellidos}`;

    const selectedDays =
      Object.keys(
        formValue.disponibilidad
      )
        .filter(
          day =>
            formValue.disponibilidad[day]
        )
        .join(', ');

    const labelsInteres: {
      [key: string]: string
    } = {

      educacion:
        'Apoyo educativo',

      sanidad:
        'Autonomía personal',

      medioAmbiente:
        'Ocio inclusivo',

      comunidad:
        'Acompañamiento',

      logistica:
        'Apoyo a actividades'

    };

    const areasSeleccionadas =
      Object.keys(
        formValue.areaInteres
      )
        .filter(
          key =>
            formValue.areaInteres[key]
        )
        .map(
          key =>
            labelsInteres[key]
        );

    if (
      formValue.otroArea?.trim()
    ) {
      areasSeleccionadas.push(
        formValue.otroArea.trim()
      );
    }

    const allInterests =
      areasSeleccionadas.join(', ');

    const userData = {

      name: fullName,

      email:
        formValue.email,

      password:
        formValue.password,

      phoneNumber:
        formValue.telefono,

      birthDate:
        formValue.fechaNacimiento,

      aboutMe:
        formValue.habilidades,

      areaInteres:
        allInterests,

      disponibilidad:
        selectedDays

    };

    this.authService
      .register(userData)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Registro realizado:',
            response
          );

          this.formError = '';

          this.showSuccessModal =
            true;

          this.cdr.detectChanges();
        },

        error: (error: any) => {

          console.error(
            'Error en el registro:',
            error
          );

          if (
            error.status === 409
          ) {

            this.formError =
              'Este correo electrónico ya está registrado. Prueba con otro o inicia sesión.';

          } else {

            this.formError =
              'No se ha podido completar el registro. Inténtalo de nuevo.';
          }

          this.cdr.detectChanges();
        }

      });
  }

  closeModal(): void {

    this.showSuccessModal = false;

    this.voluntarioForm.reset();

    this.router.navigate([
      '/login'
    ]);
  }

  onCancel(): void {

    this.formError = '';

    this.voluntarioForm.reset();
  }
}