import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewsService, News } from '../services/news.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './noticias.html',
  styleUrl: './noticias.css',
})
export class Noticias implements OnInit {
  noticias: News[] = [];
  noticiasFiltradas: News[] = [];

  categorias: string[] = ['Todas'];
  categoriaActiva: string = 'Todas';

  mostrarModal = false;
  editandoId: number | null = null;
  mensajeExito = '';
  mensajeError = '';
  guardando = false;

  mostrarConfirmacion = false;
  noticiaAEliminar: number | null = null;

  nuevaNoticia: News = {
    title: '',
    date: '',
    summary: '',
    image: '',
    category: ''
  };

  constructor(
    private newsService: NewsService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  cargarNoticias(): void {
    this.newsService.getNews().subscribe({
      next: (data) => {
        this.noticias = data;
        this.extraerCategorias();
        this.aplicarFiltro();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando noticias:', err);
        this.noticias = [];
        this.noticiasFiltradas = [];
        this.categorias = ['Todas'];
        this.cdr.detectChanges();
      }
    });
  }

  extraerCategorias(): void {
    const categoriasNoticias = this.noticias
      .map(noticia => noticia.category)
      .filter((categoria): categoria is string => Boolean(categoria));

    this.categorias = [
      'Todas',
      ...Array.from(new Set(categoriasNoticias))
    ];
  }

  filtrar(categoria: string): void {
    this.categoriaActiva = categoria;
    this.aplicarFiltro();
    this.cdr.detectChanges();
  }

  private aplicarFiltro(): void {
    this.noticiasFiltradas =
      this.categoriaActiva === 'Todas'
        ? [...this.noticias]
        : this.noticias.filter(
            noticia => noticia.category === this.categoriaActiva
          );
  }

  abrirModalNueva(): void {
    this.editandoId = null;
    this.mensajeError = '';
    this.guardando = false;

    this.nuevaNoticia = {
      title: '',
      date: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      summary: '',
      image: '',
      category: ''
    };

    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  abrirModalEditar(noticia: News): void {
    this.editandoId = noticia.id || null;
    this.mensajeError = '';
    this.guardando = false;
    this.nuevaNoticia = { ...noticia };

    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.mensajeError = '';
    this.mensajeExito = '';
    this.guardando = false;
    this.cdr.detectChanges();
  }

  guardarNoticia(): void {
    if (this.guardando) {
      return;
    }

    this.mensajeError = '';
    this.mensajeExito = '';

    if (
      !this.nuevaNoticia.title ||
      !this.nuevaNoticia.summary ||
      !this.nuevaNoticia.category
    ) {
      this.mensajeError =
        'Por favor, rellena todos los campos obligatorios.';
      this.cdr.detectChanges();
      return;
    }

    this.guardando = true;

    if (this.editandoId) {
      this.newsService
        .updateNews(this.editandoId, this.nuevaNoticia)
        .subscribe({
          next: () => {
            this.cargarNoticias();
            this.cerrarModal();
            this.mensajeExito = 'Noticia actualizada con éxito.';
            this.cdr.detectChanges();

            setTimeout(() => {
              this.mensajeExito = '';
              this.cdr.detectChanges();
            }, 2500);
          },
          error: (err) => {
            console.error('Error al actualizar la noticia:', err);
            this.guardando = false;
            this.mensajeError = 'Error al actualizar la noticia.';
            this.cdr.detectChanges();
          }
        });

      return;
    }

    this.newsService.createNews(this.nuevaNoticia).subscribe({
      next: () => {
        this.cargarNoticias();
        this.cerrarModal();
        this.mensajeExito = 'Noticia creada con éxito.';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.mensajeExito = '';
          this.cdr.detectChanges();
        }, 2500);
      },
      error: (err) => {
        console.error('Error al crear la noticia:', err);
        this.guardando = false;
        this.mensajeError = 'Error al crear la noticia.';
        this.cdr.detectChanges();
      }
    });
  }

  pedirConfirmacionEliminar(id: number | undefined): void {
    if (!id) {
      return;
    }

    this.noticiaAEliminar = id;
    this.mostrarConfirmacion = true;
    this.cdr.detectChanges();
  }

  cancelarEliminacion(): void {
    this.noticiaAEliminar = null;
    this.mostrarConfirmacion = false;
    this.cdr.detectChanges();
  }

  confirmarEliminacion(): void {
    if (!this.noticiaAEliminar) {
      return;
    }

    this.newsService.deleteNews(this.noticiaAEliminar).subscribe({
      next: () => {
        this.noticiaAEliminar = null;
        this.mostrarConfirmacion = false;
        this.cargarNoticias();

        this.mensajeExito = 'Noticia eliminada correctamente.';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.mensajeExito = '';
          this.cdr.detectChanges();
        }, 2500);
      },
      error: (err) => {
        console.error('Error al eliminar la noticia:', err);
        this.cancelarEliminacion();
      }
    });
  }
}