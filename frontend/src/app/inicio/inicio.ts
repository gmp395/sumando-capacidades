import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements AfterViewInit {

  ngAfterViewInit(): void {
    const tarjetas = document.querySelectorAll(
      '.mision-tarjeta, .area-tarjeta'
    );

    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('tarjeta-visible');
            observer.unobserve(entrada.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    tarjetas.forEach((tarjeta, i) => {
      if (tarjeta.getBoundingClientRect().top < window.innerHeight) {
        setTimeout(() => {
          tarjeta.classList.add('tarjeta-visible');
        }, i * 150);
      } else {
        observer.observe(tarjeta);
      }
    });
  }
}