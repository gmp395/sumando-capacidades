# Sumando Capacidades

Aplicación web full stack para la gestión de una organización orientada al apoyo, la autonomía y la inclusión de personas con discapacidad.

El proyecto parte de un **Trabajo de Fin de Grado del Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web (DAW)** desarrollado originalmente en equipo por **Vicente Arnal González y Gema Miguel**.

Posteriormente, el proyecto ha sido **revisado, reorganizado y actualizado por Gema Miguel** con el objetivo de mejorar su presentación, mantenimiento y funcionamiento como proyecto de portfolio. Esta revisión ha incluido cambios en la identidad de la aplicación, configuración técnica, seguridad, datos de demostración, documentación, despliegue del frontend y organización general del repositorio.

**Sumando Capacidades es una entidad ficticia creada exclusivamente para el desarrollo y presentación del proyecto.**

---

## Enlaces

- **Repositorio:** [GitHub](https://github.com/gmp395/sumando-capacidades)
- **Demo visual:** [GitHub Pages](https://gmp395.github.io/sumando-capacidades/)

> La versión publicada en GitHub Pages permite consultar la interfaz de la aplicación.  
> Las funcionalidades que requieren autenticación, acceso a la base de datos o comunicación con el backend deben ejecutarse en entorno local.

---

## Índice

- [Descripción](#descripción)
- [Objetivos](#objetivos)
- [Funcionalidades](#funcionalidades)
- [Roles de usuario](#roles-de-usuario)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Capturas de la aplicación](#capturas-de-la-aplicación)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Credenciales de prueba](#credenciales-de-prueba)
- [Base de datos](#base-de-datos)
- [Configuración local](#configuración-local)
- [Seguridad](#seguridad)
- [Diseño responsive](#diseño-responsive)
- [Revisión y actualización del proyecto](#revisión-y-actualización-del-proyecto)
- [GitHub Pages](#github-pages)
- [Estado del proyecto](#estado-del-proyecto)
- [Autores](#autores)

---

## Descripción

**Sumando Capacidades** es una aplicación web destinada a centralizar diferentes procesos relacionados con la gestión de una entidad social.

La plataforma combina una parte pública con espacios privados diferenciados para personas voluntarias y administradores.

Desde la parte pública es posible consultar información sobre la entidad, actividades, noticias, directrices y vías de participación. Los usuarios registrados pueden acceder a su área personal y gestionar su relación con las actividades, mientras que el perfil de administración dispone de herramientas adicionales para gestionar propuestas, participantes, mensajes y contenidos.

El proyecto integra frontend, backend y base de datos, incorporando autenticación mediante JWT y permisos diferenciados según el rol de usuario.

---

## Objetivos

Los principales objetivos del proyecto son:

- Facilitar el acceso a información sobre actividades y servicios.
- Permitir el registro y autenticación de personas voluntarias.
- Gestionar inscripciones y participación en actividades.
- Centralizar propuestas de nuevas actividades.
- Gestionar participantes desde el panel de administración.
- Facilitar la comunicación entre usuarios y organización.
- Publicar noticias y contenidos informativos.
- Diferenciar funcionalidades según el rol del usuario.
- Mantener una interfaz adaptable a diferentes dispositivos.
- Integrar frontend, backend y base de datos en una aplicación completa.

---

## Funcionalidades

### Área pública

Sin iniciar sesión es posible acceder a:

- Página de inicio.
- Información sobre la organización.
- Actividades de voluntariado.
- Directrices y recursos.
- Noticias.
- Formulario de registro.
- Inicio de sesión.
- Formulario de contacto.
- Política de privacidad.
- Términos y condiciones.

### Área de voluntariado

Las personas registradas pueden:

- Iniciar y cerrar sesión.
- Consultar actividades disponibles.
- Inscribirse en actividades.
- Consultar sus actividades.
- Gestionar su participación.
- Consultar mensajes relacionados con su cuenta.
- Acceder a su espacio personal.

### Área de administración

El rol de administrador permite:

- Gestionar propuestas de actividades.
- Consultar participantes.
- Gestionar inscripciones y participación.
- Consultar mensajes recibidos.
- Crear y gestionar noticias.
- Supervisar información relacionada con actividades y usuarios.

---

## Roles de usuario

La aplicación diferencia dos roles principales.

### Voluntario

Usuario registrado que puede consultar actividades, participar en ellas y acceder a su área personal.

### Administrador

Usuario con permisos adicionales para gestionar contenidos, propuestas, participantes y mensajes.

La autorización de las operaciones sensibles se controla también desde el backend.

---

## Tecnologías

### Frontend

- Angular
- TypeScript
- HTML5
- CSS3
- RxJS
- Angular Router
- HttpClient

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT
- Maven
- WebSocket
- Spring Mail

### Base de datos

- MariaDB 11
- Docker

### Herramientas

- Git
- GitHub
- GitHub Actions
- GitHub Pages
- Docker Desktop
- Visual Studio Code

---

## Arquitectura

El proyecto se divide principalmente en frontend y backend:

```text
sumando-capacidades/
│
├── backend/
│   ├── db/
│   ├── src/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── angular.json
│   └── package.json
│
├── screenshots/
│
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
│
├── .env.example
├── .gitignore
└── README.md
```

En entorno local, la comunicación sigue este esquema:

```text
Angular
localhost:4200
      │
      ▼
Spring Boot
localhost:8082
      │
      ▼
MariaDB
localhost:3306
```

---

## Capturas de la aplicación

Las imágenes se muestran como **miniaturas clicables**.  
Pulsa sobre cualquiera de ellas para verla a tamaño completo.

### Inicio

<p align="center">
  <a href="screenshots/01-home.png"><img src="screenshots/01-home.png" width="19%"></a>
  <a href="screenshots/02-home.png"><img src="screenshots/02-home.png" width="19%"></a>
  <a href="screenshots/03-home.png"><img src="screenshots/03-home.png" width="19%"></a>
  <a href="screenshots/04-home.png"><img src="screenshots/04-home.png" width="19%"></a>
  <a href="screenshots/05-home.png"><img src="screenshots/05-home.png" width="19%"></a>
</p>

### Voluntariado y actividades

<p align="center">
  <a href="screenshots/06-voluntariado.png"><img src="screenshots/06-voluntariado.png" width="23%"></a>
  <a href="screenshots/07-voluntariado.png"><img src="screenshots/07-voluntariado.png" width="23%"></a>
  <a href="screenshots/08-voluntariado.png"><img src="screenshots/08-voluntariado.png" width="23%"></a>
  <a href="screenshots/09-voluntariado.png"><img src="screenshots/09-voluntariado.png" width="23%"></a>
</p>

<p align="center">
  <a href="screenshots/10-voluntariado.png"><img src="screenshots/10-voluntariado.png" width="23%"></a>
  <a href="screenshots/11-voluntariado.png"><img src="screenshots/11-voluntariado.png" width="23%"></a>
  <a href="screenshots/12-voluntariado.png"><img src="screenshots/12-voluntariado.png" width="23%"></a>
  <a href="screenshots/13-voluntariado.png"><img src="screenshots/13-voluntariado.png" width="23%"></a>
</p>

<p align="center">
  <a href="screenshots/18-voluntariado.png"><img src="screenshots/18-voluntariado.png" width="23%"></a>
  <a href="screenshots/19-voluntariado.png"><img src="screenshots/19-voluntariado.png" width="23%"></a>
  <a href="screenshots/20-voluntariado.png"><img src="screenshots/20-voluntariado.png" width="23%"></a>
  <a href="screenshots/21-voluntariado.png"><img src="screenshots/21-voluntariado.png" width="23%"></a>
</p>

<p align="center">
  <a href="screenshots/22-voluntariado.png"><img src="screenshots/22-voluntariado.png" width="23%"></a>
  <a href="screenshots/23-voluntariado.png"><img src="screenshots/23-voluntariado.png" width="23%"></a>
  <a href="screenshots/24-voluntariado.png"><img src="screenshots/24-voluntariado.png" width="23%"></a>
  <a href="screenshots/25-voluntariado.png"><img src="screenshots/25-voluntariado.png" width="23%"></a>
</p>

### Directrices

<p align="center">
  <a href="screenshots/14-directrices.png"><img src="screenshots/14-directrices.png" width="23%"></a>
  <a href="screenshots/15-directrices.png"><img src="screenshots/15-directrices.png" width="23%"></a>
  <a href="screenshots/16-directrices.png"><img src="screenshots/16-directrices.png" width="23%"></a>
  <a href="screenshots/17-directrices.png"><img src="screenshots/17-directrices.png" width="23%"></a>
</p>

<p align="center">
  <a href="screenshots/26-directrices.png"><img src="screenshots/26-directrices.png" width="23%"></a>
  <a href="screenshots/27-directrices.png"><img src="screenshots/27-directrices.png" width="23%"></a>
  <a href="screenshots/28-directrices.png"><img src="screenshots/28-directrices.png" width="23%"></a>
  <a href="screenshots/29-directrices.png"><img src="screenshots/29-directrices.png" width="23%"></a>
</p>

### Noticias

<p align="center">
  <a href="screenshots/30-noticias.png"><img src="screenshots/30-noticias.png" width="23%"></a>
  <a href="screenshots/31-noticias.png"><img src="screenshots/31-noticias.png" width="23%"></a>
  <a href="screenshots/32-noticias.png"><img src="screenshots/32-noticias.png" width="23%"></a>
  <a href="screenshots/33-noticias.png"><img src="screenshots/33-noticias.png" width="23%"></a>
</p>

### Registro de voluntariado

<p align="center">
  <a href="screenshots/34-formulario.png"><img src="screenshots/34-formulario.png" width="23%"></a>
  <a href="screenshots/35-formulario.png"><img src="screenshots/35-formulario.png" width="23%"></a>
  <a href="screenshots/36-formulario.png"><img src="screenshots/36-formulario.png" width="23%"></a>
  <a href="screenshots/37-formulario.png"><img src="screenshots/37-formulario.png" width="23%"></a>
</p>

### Inicio de sesión

<p align="center">
  <a href="screenshots/38-login.png"><img src="screenshots/38-login.png" width="47%"></a>
  <a href="screenshots/39-login.png"><img src="screenshots/39-login.png" width="47%"></a>
</p>

### Área de voluntariado

<p align="center">
  <a href="screenshots/40-sesion-voluntario.png"><img src="screenshots/40-sesion-voluntario.png" width="47%"></a>
  <a href="screenshots/41-sesion-voluntario.png"><img src="screenshots/41-sesion-voluntario.png" width="47%"></a>
</p>

### Panel de administración

<p align="center">
  <a href="screenshots/42-panel-administrador.png"><img src="screenshots/42-panel-administrador.png" width="23%"></a>
  <a href="screenshots/43-panel-administrador.png"><img src="screenshots/43-panel-administrador.png" width="23%"></a>
  <a href="screenshots/44-panel-administrador.png"><img src="screenshots/44-panel-administrador.png" width="23%"></a>
  <a href="screenshots/45-panel-administrador.png"><img src="screenshots/45-panel-administrador.png" width="23%"></a>
</p>

<p align="center">
  <a href="screenshots/46-panel-administrador.png"><img src="screenshots/46-panel-administrador.png" width="23%"></a>
  <a href="screenshots/47-panel-administrador.png"><img src="screenshots/47-panel-administrador.png" width="23%"></a>
  <a href="screenshots/48-panel-administrador.png"><img src="screenshots/48-panel-administrador.png" width="23%"></a>
  <a href="screenshots/49-panel-administrador.png"><img src="screenshots/49-panel-administrador.png" width="23%"></a>
</p>

### Contacto

<p align="center">
  <a href="screenshots/50-contacto.png"><img src="screenshots/50-contacto.png" width="31%"></a>
  <a href="screenshots/51-contacto.png"><img src="screenshots/51-contacto.png" width="31%"></a>
  <a href="screenshots/52-contacto.png"><img src="screenshots/52-contacto.png" width="31%"></a>
</p>

---

## Instalación y ejecución

### Requisitos

Para ejecutar el proyecto localmente es necesario disponer de:

- Java 21
- Node.js y npm
- Docker Desktop
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/gmp395/sumando-capacidades.git
cd sumando-capacidades
```

### 2. Base de datos

La base de datos MariaDB se ejecuta mediante Docker.

Desde la carpeta `backend`:

```bash
cd backend
docker compose up -d
```

Comprobar que está funcionando:

```bash
docker ps
```

El contenedor de MariaDB debe aparecer como `healthy`.

La base de datos utiliza:

```text
Puerto: 3306
Base de datos: proyecto
```

### 3. Backend

Desde `backend`:

```bash
./mvnw spring-boot:run -Dspring-boot.run.profiles=local
```

El backend se ejecutará en:

```text
http://localhost:8082
```

### 4. Frontend

En otra terminal:

```bash
cd frontend
npm install
npm start
```

La aplicación estará disponible en:

```text
http://localhost:4200
```

---

## Credenciales de prueba

Estas credenciales están destinadas exclusivamente al entorno local de demostración.

### Usuario voluntario

```text
Email: test@test.com
Contraseña: test123
```

### Administrador

```text
Email: admin@admin.com
Contraseña: admin123
```

> Estas credenciales no permiten iniciar sesión desde GitHub Pages porque el backend no está desplegado públicamente.

---

## Base de datos

La aplicación utiliza **MariaDB 11**.

La estructura contempla, entre otras, entidades relacionadas con:

- Usuarios.
- Actividades.
- Inscripciones.
- Noticias.
- Directrices.
- Mensajes de contacto.
- Mensajes internos.
- Propuestas.
- Gestión de participación.

La inicialización de la base de datos se encuentra en:

```text
backend/db/001_init.sql
```

Los datos persistentes de MariaDB se almacenan mediante un volumen Docker.

---

## Configuración local

La configuración general del backend utiliza variables de entorno para evitar almacenar credenciales o secretos dentro del repositorio.

El archivo público de referencia es:

```text
.env.example
```

Para el desarrollo local puede utilizarse:

```text
backend/src/main/resources/application-local.properties
```

Este archivo está excluido del control de versiones.

Ejemplo:

```properties
spring.datasource.username=dev
spring.datasource.password=dev

jwt.secret=TU_SECRETO_JWT_LOCAL

spring.mail.username=TU_USUARIO_MAILTRAP
spring.mail.password=TU_PASSWORD_MAILTRAP

server.port=8082
```

Las credenciales reales y los secretos no deben incluirse en GitHub.

---

## Seguridad

La aplicación incorpora:

- Autenticación mediante JWT.
- Spring Security.
- Autorización basada en roles.
- Contraseñas almacenadas mediante hash BCrypt.
- Protección de endpoints administrativos.
- Variables de entorno para información sensible.
- Exclusión de configuraciones locales mediante `.gitignore`.
- Claves de almacenamiento local específicas del proyecto para evitar conflictos de sesión con otras aplicaciones.

---

## Diseño responsive

La interfaz ha sido desarrollada para adaptarse a diferentes tamaños de pantalla.

Se han trabajado especialmente:

- Navegación.
- Formularios.
- Tarjetas de actividades.
- Secciones informativas.
- Área de usuario.
- Panel administrativo.
- Noticias.
- Página de contacto.

Aunque las capturas incluidas en este README se centran principalmente en la versión de escritorio para mostrar con mayor claridad la información y las funcionalidades, la aplicación cuenta con adaptación responsive.

---

## Revisión y actualización del proyecto

Este repositorio corresponde a una **versión revisada del proyecto académico original**.

La base funcional del proyecto fue desarrollada conjuntamente como TFG. Posteriormente se realizó una revisión destinada a mejorar su mantenimiento, presentación y adecuación como proyecto de portfolio.

Entre los trabajos realizados durante esta actualización se incluyen:

- Reorganización y limpieza del repositorio.
- Revisión de la estructura general del proyecto.
- Renovación de la identidad visual y conceptual bajo el nombre **Sumando Capacidades**.
- Adaptación de textos y contenidos a la nueva identidad.
- Revisión de actividades, noticias, directrices y datos de demostración.
- Incorporación de nuevas imágenes y contenido visual.
- Actualización del entorno para trabajar con **Java 21**.
- Actualización de la base de datos a **MariaDB 11**.
- Revisión del archivo `pom.xml`.
- Revisión de la configuración de Spring Boot.
- Simplificación de la configuración Docker.
- Separación de credenciales y secretos mediante variables de entorno.
- Creación de una configuración local excluida del repositorio.
- Revisión del sistema de autenticación.
- Corrección del almacenamiento de sesión del frontend.
- Revisión de rutas y recursos estáticos.
- Adaptación de las rutas de assets para GitHub Pages.
- Revisión de la compilación Angular.
- Actualización de la documentación.
- Incorporación de nuevas capturas de funcionamiento.
- Configuración de **GitHub Actions**.
- Publicación del frontend mediante **GitHub Pages**.
- Revisión general del proyecto para su presentación como portfolio.

El objetivo de esta revisión ha sido conservar la base y la autoría compartida del TFG original, diferenciando al mismo tiempo el trabajo de actualización realizado posteriormente.

---

## GitHub Pages

El frontend se despliega automáticamente mediante **GitHub Actions**.

El workflow se encuentra en:

```text
.github/workflows/deploy-pages.yml
```

Cada actualización de la rama `main` genera una nueva compilación y despliegue.

Demo:

[https://gmp395.github.io/sumando-capacidades/](https://gmp395.github.io/sumando-capacidades/)

### Limitación de la demo

GitHub Pages aloja exclusivamente contenido estático.

Por este motivo, las funcionalidades que requieren:

- autenticación;
- consultas a MariaDB;
- gestión de actividades;
- inscripciones;
- mensajes;
- administración;

requieren ejecutar el backend Spring Boot y la base de datos en entorno local.

---

## Estado del proyecto

El proyecto incluye actualmente:

- [x] Frontend Angular.
- [x] Backend Spring Boot.
- [x] Base de datos MariaDB.
- [x] Docker para la base de datos.
- [x] Registro de usuarios.
- [x] Inicio de sesión.
- [x] Autenticación JWT.
- [x] Roles de voluntario y administrador.
- [x] Gestión de actividades.
- [x] Inscripciones.
- [x] Gestión de propuestas.
- [x] Gestión de participantes.
- [x] Sistema de mensajes.
- [x] Noticias.
- [x] Directrices.
- [x] Formulario de contacto.
- [x] Diseño responsive.
- [x] GitHub Pages para demostración visual.
- [x] GitHub Actions para despliegue automático.
- [x] Revisión y actualización posterior para portfolio.

---

## Autores

### Proyecto académico original

Desarrollado conjuntamente como Trabajo de Fin de Grado del Ciclo Formativo de Grado Superior en **Desarrollo de Aplicaciones Web (DAW)** por:

**Vicente Arnal González**

**Gema Miguel**  
[GitHub](https://github.com/gmp395)

### Revisión posterior del proyecto

Revisión, reorganización, actualización técnica, nueva identidad, documentación y preparación para portfolio realizadas posteriormente por:

**Gema Miguel**  
[GitHub](https://github.com/gmp395)

---

> **Nota:** Sumando Capacidades es una organización ficticia creada con fines académicos para el desarrollo y presentación de este proyecto.