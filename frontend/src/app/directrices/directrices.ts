import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  GuidelineService,
  Guideline
} from '../services/guideline.service';

@Component({
  selector: 'app-directrices',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './directrices.html',
  styleUrl: './directrices.css',
})
export class Directrices implements OnInit {

  directrices: Guideline[] = [];
  directricesFiltradas: Guideline[] = [];

  categoriaActiva: string = 'Todos los recursos';
  ordenActivo: boolean = false;

  private meses: { [key: string]: number } = {
    Ene: 0,
    Feb: 1,
    Mar: 2,
    Abr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Ago: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dic: 11
  };

  constructor(
    private guidelineService: GuidelineService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDirectrices();
  }

  cargarDirectrices(): void {
    this.guidelineService.getGuidelines().subscribe({
      next: (data) => {
        this.directrices = data.sort(
          (a, b) => a.title.localeCompare(b.title)
        );

        this.directricesFiltradas = [
          ...this.directrices
        ];

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(
          'Error cargando directrices:',
          err
        );
      }
    });
  }

  filtrarPorCategoria(
    categoria: string
  ): void {
    this.categoriaActiva = categoria;
    this.ordenActivo = false;

    this.aplicarFiltros();
  }

  buscarDirectrices(
    event: Event
  ): void {
    const input =
      event.target as HTMLInputElement;

    this.aplicarFiltros(input.value);
  }

  private aplicarFiltros(
    textoBusqueda: string = ''
  ): void {
    let resultado = [
      ...this.directrices
    ];

    if (
      this.categoriaActiva !==
      'Todos los recursos'
    ) {
      resultado = resultado.filter(
        directriz =>
          directriz.category.toLowerCase() ===
          this.categoriaActiva.toLowerCase()
      );
    }

    if (textoBusqueda) {

      const normalizar = (
        texto: string
      ): string =>
        texto
          .normalize('NFD')
          .replace(
            /[\u0300-\u036f]/g,
            ''
          )
          .toLowerCase();

      const busqueda =
        normalizar(textoBusqueda);

      resultado = resultado.filter(
        directriz =>
          normalizar(
            directriz.title
          ).includes(busqueda)
      );
    }

    this.directricesFiltradas =
      resultado;

    this.cdr.detectChanges();
  }

  ordenarPorRecientes(): void {
    this.ordenActivo =
      !this.ordenActivo;

    if (this.ordenActivo) {

      this.directricesFiltradas.sort(
        (a, b) => {
          const fechaA =
            this.parseFecha(a.date);

          const fechaB =
            this.parseFecha(b.date);

          return (
            fechaB.getTime() -
            fechaA.getTime()
          );
        }
      );

    } else {

      this.directricesFiltradas.sort(
        (a, b) =>
          a.title.localeCompare(
            b.title
          )
      );
    }

    this.cdr.detectChanges();
  }

  private parseFecha(
    fechaStr: string
  ): Date {
    const partes =
      fechaStr.split(' ');

    const mesIndex =
      this.meses[partes[0]] !== undefined
        ? this.meses[partes[0]]
        : 0;

    const dia =
      parseInt(partes[1]) || 1;

    const hoy =
      new Date();

    const anioActual =
      hoy.getFullYear();

    let anioDoc =
      anioActual;

    if (
      mesIndex >
      hoy.getMonth()
    ) {
      anioDoc =
        anioActual - 1;
    }

    return new Date(
      anioDoc,
      mesIndex,
      dia
    );
  }

  getIconClass(
    color: string
  ): string {
    switch (
      color?.toLowerCase()
    ) {
      case 'red':
        return 'pdf-icon';

      case 'blue':
        return 'doc-icon-blue';

      case 'yellow':
        return 'doc-icon-yellow';

      case 'green':
        return 'doc-icon-green';

      case 'purple':
        return 'doc-icon-purple';

      case 'orange':
        return 'doc-icon-orange';

      default:
        return 'doc-icon-blue';
    }
  }

  getBadgeClass(
    category: string
  ): string {
    switch (
      category?.toUpperCase()
    ) {
      case 'ORGANIZACIÓN':
        return 'badge-mission';

      case 'VOLUNTARIADO':
        return 'badge-ops';

      case 'INCLUSIÓN':
        return 'badge-comm';

      case 'SEGURIDAD':
        return 'badge-safety';

      case 'LEGAL':
        return 'badge-legal';

      case 'FAMILIAS':
        return 'badge-reports';

      default:
        return 'badge-ops';
    }
  }

  getDocumentNote(
  category: string
): string {
  switch (
    category?.toLowerCase()
  ) {
    case 'voluntariado':
      return 'Disponible durante el proceso de incorporación al voluntariado.';

    case 'familias':
  return 'Disponible para familias y personas participantes como material de información y apoyo.';

    case 'inclusión':
      return 'Disponible como material de apoyo para la formación y el acompañamiento.';

    case 'seguridad':
      return 'Disponible antes de participar en las actividades de la entidad.';

    case 'legal':
      return 'Disponible durante los procesos de inscripción y participación.';

    case 'organización':
      return 'Disponible como información general sobre Sumando Capacidades.';

    default:
      return 'Información disponible para las personas vinculadas a la entidad.';
  }
}
}