-- =========================================================
-- SUMANDO CAPACIDADES
-- Script inicial de base de datos
-- =========================================================


-- =========================================================
-- USUARIOS
-- =========================================================

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255),
    birth_date DATE,
    about_me VARCHAR(255),
    rol ENUM('volunteer', 'admin') DEFAULT 'volunteer',
    interest_area VARCHAR(255),
    availability VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expiry DATETIME(6)
);


-- =========================================================
-- ACTIVIDADES
-- =========================================================

CREATE TABLE activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    image_url VARCHAR(500),
    difficulty VARCHAR(100),
    activity_date DATETIME NOT NULL,
    max_participants INT DEFAULT 0,

    category ENUM(
        'social',
        'ambiental',
        'educativa',
        'salud'
    ) DEFAULT 'social',

    status ENUM(
        'propuesta',
        'programada',
        'en curso',
        'finalizada',
        'cancelada'
    ) DEFAULT 'programada'
);


-- =========================================================
-- INSCRIPCIONES EN ACTIVIDADES
-- =========================================================

CREATE TABLE users_activities (
    user_id INT NOT NULL,
    activity_id INT NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    status ENUM(
        'inscrito',
        'asistio',
        'cancelo',
        'lista_espera'
    ) DEFAULT 'inscrito',

    PRIMARY KEY (user_id, activity_id),

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_activity
        FOREIGN KEY (activity_id)
        REFERENCES activities(id)
        ON DELETE CASCADE
);


-- =========================================================
-- USUARIO ADMINISTRADOR
-- =========================================================
-- Credenciales de demostración:
-- Email: admin@admin.com
-- Password: admin123
--
-- La contraseña se almacena mediante BCrypt.
-- Esta cuenta es exclusivamente de demostración para el proyecto.
-- =========================================================

INSERT INTO users (
    name,
    email,
    password,
    phone_number,
    birth_date,
    about_me,
    rol,
    interest_area,
    availability,
    reset_token,
    reset_token_expiry
)
VALUES (
    'Admin ONG',
    'admin@admin.com',
    '$2a$10$fa3X3Fd19j0b.ea3FD/ZR.vpE6/Wtm2J0HN881ONr8rcdtzZU1baq',
    '600000000',
    '1980-01-01',
    'Administrador de la plataforma.',
    'admin',
    NULL,
    NULL,
    NULL,
    NULL
);


-- =========================================================
-- ACTIVIDADES INICIALES
-- =========================================================

INSERT INTO activities (
    title,
    description,
    location,
    image_url,
    difficulty,
    activity_date,
    max_participants,
    category,
    status
)
VALUES

(
    'Acompañamiento en salida cultural',
    'Apoyo a las personas participantes durante una salida cultural, favoreciendo la autonomía, la participación y la convivencia.',
    'Centro de la ciudad',
    '/images/activities/salida-cultural.jpg',
    'Baja',
    '2026-09-05 10:00:00',
    12,
    'social',
    'programada'
),

(
    'Taller de autonomía personal',
    'Actividad práctica orientada al desarrollo de habilidades para desenvolverse con mayor autonomía en situaciones de la vida cotidiana.',
    'Centro de actividades',
    '/images/activities/autonomia-personal.jpg',
    'Media',
    '2026-09-12 17:00:00',
    10,
    'salud',
    'programada'
),

(
    'Actividad deportiva inclusiva',
    'Jornada deportiva adaptada destinada a fomentar la participación, el ocio inclusivo y la convivencia.',
    'Polideportivo municipal',
    '/images/activities/deporte-inclusivo.jpg',
    'Media',
    '2026-09-19 11:00:00',
    20,
    'ambiental',
    'programada'
),

(
    'Taller de competencias digitales',
    'Apoyo en el uso cotidiano de herramientas digitales, dispositivos móviles e Internet.',
    'Aula de formación',
    '/images/activities/competencias-digitales.jpg',
    'Media',
    '2026-09-26 17:00:00',
    8,
    'educativa',
    'programada'
),

(
    'Acompañamiento en tarde de ocio',
    'Actividad de ocio compartido orientada a favorecer la participación social y las relaciones personales.',
    'Centro comunitario',
    '/images/activities/ocio-inclusivo.jpg',
    'Baja',
    '2026-10-03 16:30:00',
    15,
    'social',
    'programada'
),

(
    'Apoyo educativo individual',
    'Sesión de acompañamiento educativo adaptada a las necesidades de las personas participantes.',
    'Aula de apoyo',
    '/images/activities/apoyo-educativo.jpg',
    'Media',
    '2026-10-10 17:00:00',
    6,
    'educativa',
    'programada'
),

(
    'Encuentro de apoyo a familias',
    'Espacio de encuentro, información y acompañamiento destinado a familias y personas cuidadoras.',
    'Centro de actividades',
    '/images/activities/apoyo-familias.jpg',
    'Baja',
    '2026-10-17 11:00:00',
    12,
    'salud',
    'programada'
),

(
    'Taller de habilidades sociales',
    'Actividad orientada a trabajar comunicación, interacción social, cooperación y resolución de situaciones cotidianas.',
    'Centro comunitario',
    '/images/activities/habilidades-sociales.jpg',
    'Alta',
    '2026-10-24 17:00:00',
    10,
    'social',
    'programada'
);


-- =========================================================
-- NOTICIAS
-- =========================================================

CREATE TABLE noticias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,
    summary TEXT,
    image VARCHAR(255),
    category VARCHAR(255)
);


INSERT INTO noticias (
    id,
    title,
    date,
    summary,
    image,
    category
)
VALUES

(
    1,
    'Nueva jornada de deporte inclusivo',
    '18 Ago 2026',
    'Preparamos una nueva jornada de deporte inclusivo para fomentar la participación, la convivencia y el disfrute compartido.',
    '/images/activities/deporte-inclusivo.jpg',
    'Inclusión'
),

(
    2,
    'Taller de autonomía personal para la vida cotidiana',
    '10 Ago 2026',
    'Una actividad práctica centrada en el desarrollo de habilidades que favorecen una mayor autonomía en el día a día.',
    '/images/activities/autonomia-personal.jpg',
    'Autonomía'
),

(
    3,
    'Encuentro comunitario con familias y voluntariado',
    '02 Ago 2026',
    'Familias y personas voluntarias compartieron un espacio de encuentro, participación y apoyo mutuo.',
    '/images/activities/apoyo-familias.jpg',
    'Comunidad'
),

(
    4,
    'Formación para nuevas personas voluntarias',
    '15 Jul 2026',
    'Sesión de acogida y formación dirigida a personas que comienzan su participación en Sumando Capacidades.',
    '/images/activities/habilidades-sociales.jpg',
    'Formación'
);


-- =========================================================
-- DIRECTRICES Y RECURSOS
-- =========================================================

CREATE TABLE guidelines (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(255),
    size VARCHAR(255),
    date VARCHAR(255),
    icon_color VARCHAR(255),
    download_url VARCHAR(255)
);


INSERT INTO guidelines (
    id,
    title,
    description,
    category,
    size,
    date,
    icon_color,
    download_url
)
VALUES

(
    1,
    'Quiénes somos y cómo trabajamos',
    'Información general sobre Sumando Capacidades, sus objetivos y su forma de trabajo.',
    'ORGANIZACIÓN',
    NULL,
    NULL,
    'blue',
    NULL
),

(
    2,
    'Guía de acogida para personas voluntarias',
    'Información básica para conocer el funcionamiento de la entidad y el proceso de incorporación al voluntariado.',
    'VOLUNTARIADO',
    NULL,
    NULL,
    'green',
    NULL
),

(
    3,
    'Guía de trato inclusivo y comunicación',
    'Recomendaciones para favorecer una comunicación respetuosa, accesible e inclusiva.',
    'INCLUSIÓN',
    NULL,
    NULL,
    'blue',
    NULL
),

(
    4,
    'Protocolo básico de seguridad en actividades',
    'Indicaciones generales para participar de forma segura en las actividades organizadas por la entidad.',
    'SEGURIDAD',
    NULL,
    NULL,
    'orange',
    NULL
),

(
    5,
    'Privacidad y protección de datos',
    'Información general sobre privacidad y tratamiento de datos dentro de la plataforma.',
    'LEGAL',
    NULL,
    NULL,
    'yellow',
    NULL
),

(
    6,
    'Guía para familias',
    'Información y recursos básicos para familias y personas participantes.',
    'FAMILIAS',
    NULL,
    NULL,
    'purple',
    NULL
);


-- =========================================================
-- MENSAJES DE CONTACTO
-- =========================================================

CREATE TABLE contact_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    asunto VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    fecha_envio DATETIME(6) NOT NULL,
    leido BIT(1) NOT NULL,
    mensaje TEXT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    privacidad BIT(1) NOT NULL,
    fecha_respuesta DATETIME(6),
    respuesta TEXT
);


-- =========================================================
-- CHAT / RESPUESTAS
-- =========================================================

CREATE TABLE chat_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    is_admin BIT(1) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    timestamp DATETIME(6) NOT NULL,
    contact_message_id BIGINT NOT NULL,
    admin BIT(1),

    CONSTRAINT fk_contact_message
        FOREIGN KEY (contact_message_id)
        REFERENCES contact_messages(id)
        ON DELETE CASCADE
);