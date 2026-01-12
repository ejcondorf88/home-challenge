# 🏠 Home Challenger — Sistema de Gestión de Usuarios y Zonas

Sistema completo para gestionar usuarios y zonas geográficas con roles de administrador y cliente. La aplicación permite gestionar usuarios, asignar zonas geográficas y programar interrupciones de servicio por sector.

---

## 📋 Tabla de Contenidos

- [Características](#-características-principales)
- [Tecnologías](#️-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Prerrequisitos](#-prerrequisitos)
- [Instalación y Configuración](#️-instalación-y-configuración)
- [Ejecución Local](#-ejecución-local)
- [Ejecución con Docker](#-ejecución-con-docker)
- [API Endpoints](#-api-rest-endpoints)
- [Base de Datos](#-base-de-datos)
- [Infraestructura](#-infraestructura-con-terraform)
- [Variables de Entorno](#-variables-de-entorno)
- [Documentación API](#-documentación-api)
- [Troubleshooting](#-troubleshooting)

---

## 🌟 Características Principales

- **Sistema de Autenticación**: Login y registro de usuarios con JWT
- **Gestión de Usuarios**: CRUD completo para administradores
- **Gestión de Zonas**: Creación y administración de zonas geográficas con coordenadas
- **Roles de Usuario**:
  - **ADMIN**: Gestión completa de usuarios y zonas
  - **USER**: Visualización de información personal y zonas asignadas
- **Seguridad**: Autenticación y autorización con Spring Security y JWT
- **API REST**: Documentación con Swagger/OpenAPI
- **Frontend Moderno**: Interfaz React con PrimeReact y mapas interactivos (Leaflet)
- **Infraestructura como Código**: Despliegue automatizado con Terraform en AWS

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Java 17**: Lenguaje de programación
- **Spring Boot 3.3.6**: Framework de desarrollo
- **Spring Security**: Autenticación y autorización
- **Spring Data JPA**: Persistencia de datos
- **PostgreSQL**: Base de datos relacional
- **JWT (JSON Web Tokens)**: Autenticación stateless
- **Maven**: Gestión de dependencias y construcción
- **Lombok**: Reducción de código boilerplate
- **ModelMapper**: Mapeo de objetos DTO
- **SpringDoc OpenAPI**: Documentación de API

### Frontend
- **React 19**: Biblioteca de UI
- **Vite 6**: Build tool y dev server
- **PrimeReact**: Componentes de UI
- **React Router DOM**: Navegación
- **Leaflet**: Mapas interactivos
- **Axios**: Cliente HTTP
- **ESLint**: Linter de código

### Infraestructura
- **Terraform**: Infraestructura como código
- **AWS EC2**: Servidores virtuales
- **Docker**: Contenedores
- **Nginx**: Servidor web para frontend
- **Maven**: Build del backend

---

## 📁 Estructura del Proyecto

```
home-challenge/
├── backend/                    # API Spring Boot
│   ├── docker/
│   │   └── Dockerfile         # Imagen Docker del backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/homechallenger/
│   │   │   │   ├── config/    # Configuraciones (CORS, Security, etc.)
│   │   │   │   ├── controller/ # Controladores REST
│   │   │   │   ├── domain/    # Entidades y enums
│   │   │   │   ├── dto/       # Data Transfer Objects
│   │   │   │   ├── exception/ # Manejo de excepciones
│   │   │   │   ├── mapper/    # Mappers DTO ↔ Entity
│   │   │   │   ├── repository/ # Repositorios JPA
│   │   │   │   ├── security/  # JWT y seguridad
│   │   │   │   └── service/   # Lógica de negocio
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/              # Tests unitarios
│   └── pom.xml                # Dependencias Maven
│
├── fronted/                   # Frontend React
│   ├── docker/
│   │   └── Dockerfile         # Imagen Docker del frontend
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   │   ├── forms/         # Formularios
│   │   │   └── map/           # Componentes de mapas
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Páginas de la aplicación
│   │   ├── services/          # Servicios API
│   │   └── utils/             # Utilidades
│   ├── package.json
│   └── vite.config.js
│
└── infra/                     # Infraestructura Terraform
    ├── main.tf                # Recursos principales
    ├── variables.tf            # Variables de Terraform
    ├── output.tf              # Outputs de Terraform
    ├── provider.tf            # Configuración del provider
    └── scripts/
        └── server.sh          # Script de arranque EC2
```

---

## 📦 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Java 17** o superior ([Descargar](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html))
- **Node.js 16+** y npm/yarn ([Descargar](https://nodejs.org/))
- **Maven 3.6+** ([Descargar](https://maven.apache.org/download.cgi))
- **PostgreSQL 12+** o acceso a una base de datos PostgreSQL/Supabase
- **Docker** (opcional, para ejecución con contenedores)
- **Terraform** (opcional, para infraestructura)

---

## ⚙️ Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/ejcondorf88/home-challenge.git
cd home-challenge
```

### 2. Configurar Base de Datos

Crea una base de datos PostgreSQL (puedes usar Supabase o una instancia local):

```sql
CREATE DATABASE home_challenger;
```

### 3. Configurar Variables de Entorno del Backend

Edita `backend/src/main/resources/application.properties` o configura las siguientes variables de entorno:

```properties
# Base de datos
DATABASE_URL=jdbc:postgresql://localhost:5432/home_challenger
USER=tu_usuario_postgres
PASSWORD=tu_contraseña_postgres

# JWT
SECRET=tu_clave_secreta_jwt_muy_segura_y_larga
```

**Nota**: Para producción, usa variables de entorno en lugar de hardcodear valores en `application.properties`.

---

## 🚀 Ejecución Local

### Backend (Spring Boot)

1. Navegar al directorio del backend:
   ```bash
   cd backend
   ```

2. Compilar el proyecto:
   ```bash
   mvn clean install
   ```

3. Ejecutar la aplicación:
   ```bash
   mvn spring-boot:run
   ```

   La API estará disponible en: `http://localhost:8080/api/v1`

4. Acceder a la documentación Swagger:
   ```
   http://localhost:8080/api/v1/swagger-ui.html
   ```

### Frontend (React + Vite)

1. Navegar al directorio del frontend:
   ```bash
   cd fronted
   ```

2. Instalar dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

   La aplicación estará disponible en: `http://localhost:5173`

**Nota**: Asegúrate de que el backend esté corriendo antes de iniciar el frontend.

---

## 🐳 Ejecución con Docker

### Backend

1. Construir la imagen:
   ```bash
   docker build -t home-challenge-backend:latest -f backend/docker/Dockerfile ./backend
   ```

2. Ejecutar el contenedor:
   ```bash
   docker run -p 8080:8080 \
     -e DATABASE_URL=jdbc:postgresql://host.docker.internal:5432/home_challenger \
     -e USER=tu_usuario \
     -e PASSWORD=tu_contraseña \
     -e SECRET=tu_clave_secreta \
     home-challenge-backend:latest
   ```

### Frontend

1. Construir la imagen:
   ```bash
   docker build -t home-challenge-frontend:latest -f fronted/docker/Dockerfile ./fronted
   ```

2. Ejecutar el contenedor:
   ```bash
   docker run -p 80:80 home-challenge-frontend:latest
   ```

### Docker Compose (Recomendado)

Crea un archivo `docker-compose.yml` en la raíz del proyecto:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: home_challenger
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build:
      context: ./backend
      dockerfile: docker/Dockerfile
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: jdbc:postgresql://postgres:5432/home_challenger
      USER: postgres
      PASSWORD: postgres
      SECRET: your-secret-key-here
    depends_on:
      - postgres

  frontend:
    build:
      context: ./fronted
      dockerfile: docker/Dockerfile
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

Ejecutar:
```bash
docker-compose up -d
```

---

## 📚 API REST Endpoints

La API está disponible bajo el prefijo `/api/v1`.

### Autenticación

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "usuario",
  "password": "contraseña"
}
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "usuario",
    "email": "usuario@example.com",
    "name": "Nombre",
    "lastName": "Apellido",
    "role": "ADMIN"
  }
}
```

#### Registro
```http
POST /api/v1/auth/signup
Content-Type: application/json

{
  "email": "nuevo@example.com",
  "name": "Nombre",
  "lastName": "Apellido",
  "username": "nuevo_usuario",
  "password": "contraseña_segura",
  "identification": "1234567890",
  "coordenadasDomicilio": "lat,lng",
  "rol": "USER"
}
```

### Gestión de Usuarios (Requiere autenticación ADMIN)

#### Obtener todos los usuarios
```http
GET /api/v1/admin/users
Authorization: Bearer {token}
```

#### Crear usuario
```http
POST /api/v1/admin/users
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "usuario@example.com",
  "name": "Nombre",
  "lastName": "Apellido",
  "username": "usuario",
  "password": "contraseña",
  "identification": "1234567890",
  "coordenadasDomicilio": "lat,lng",
  "rol": "USER"
}
```

#### Actualizar usuario
```http
PUT /api/v1/admin/users/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Nombre Actualizado",
  "lastName": "Apellido Actualizado",
  "email": "nuevo@example.com"
}
```

#### Eliminar usuario
```http
DELETE /api/v1/admin/users/{id}
Authorization: Bearer {token}
```

### Gestión de Zonas (Requiere autenticación ADMIN)

#### Obtener todas las zonas
```http
GET /api/v1/admin/zones
Authorization: Bearer {token}
```

#### Crear zona
```http
POST /api/v1/admin/zones
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Zona Norte",
  "openingTime": "08:00:00",
  "closingTime": "18:00:00",
  "coordinates": "{\"lat\": -0.1807, \"lng\": -78.4678}",
  "userId": 1
}
```

#### Actualizar zona
```http
PUT /api/v1/admin/zones/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Zona Norte Actualizada",
  "openingTime": "09:00:00",
  "closingTime": "19:00:00"
}
```

#### Eliminar zona
```http
DELETE /api/v1/admin/zones/{id}
Authorization: Bearer {token}
```

---

## 🗄️ Base de Datos

### Diagrama Entidad-Relación

```
┌─────────────┐         ┌──────────────┐
│    USER     │◄───┐    │     ZONE     │
├─────────────┤    │    ├──────────────┤
│ id          │    │    │ id           │
│ username    │    │    │ name         │
│ password    │    │    │ opening_time │
│ name        │    │    │ closing_time │
│ last_name   │    │    │ coordinates  │
│ email       │    │    │ user_id (FK) │
│ identification│  │    └──────────────┘
│ role (ENUM) │    │
│ coordenadas │    │
│ created_at  │    │
└─────────────┘    │
                   │
                   │ 1:1
                   └──────┘
```

### Relaciones

- **USER ↔ ZONE**: Relación 1:1 (Un usuario tiene una zona, una zona pertenece a un usuario)
- **USER.role**: Enum (`USER`, `ADMIN`)

### Scripts de Creación

Las tablas se crean automáticamente con `spring.jpa.hibernate.ddl-auto=update`. Para crear manualmente:

```sql
CREATE TYPE role_enum AS ENUM ('USER', 'ADMIN');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    identification VARCHAR(255) UNIQUE NOT NULL,
    role role_enum NOT NULL,
    coordenadas_domicilio VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE zone (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    opening_time TIME,
    closing_time TIME,
    coordinates TEXT,
    user_id INTEGER UNIQUE REFERENCES users(id)
);
```

---

## ☁️ Infraestructura con Terraform

### Despliegue en AWS

1. Configurar credenciales de AWS:
   ```bash
   aws configure
   ```

2. Navegar al directorio de infraestructura:
   ```bash
   cd infra
   ```

3. Inicializar Terraform:
   ```bash
   terraform init
   ```

4. Revisar el plan de ejecución:
   ```bash
   terraform plan
   ```

5. Aplicar los cambios:
   ```bash
   terraform apply
   ```

### Variables de Terraform

Edita `infra/variables.tf` o crea `terraform.tfvars`:

```hcl
key_pair_name = "mi-keypair"
ami_id = "ami-07ff62358b87c7116"  # Amazon Linux 3
instance_name = "home-challenge-instance"
rsa_bits = 4096
allowed_ingress_ports = [22, 80]
```

### Recursos Creados

- **EC2 Instance**: Instancia t3.micro con Amazon Linux 3
- **Security Group**: Permite tráfico SSH (22) y HTTP (80)
- **Key Pair**: Par de llaves SSH para acceso
- **User Data**: Script de arranque que instala Docker y Nginx

### Notas de Seguridad

⚠️ **Importante**: El security group actual permite SSH desde `0.0.0.0/0`. Para producción, restringe el acceso SSH a IPs específicas:

```hcl
ingress {
  from_port   = 22
  to_port     = 22
  protocol    = "tcp"
  cidr_blocks = ["TU_IP/32"]  # Solo tu IP
}
```

---

## 🔐 Variables de Entorno

### Backend

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | URL de conexión a PostgreSQL | `jdbc:postgresql://localhost:5432/home_challenger` |
| `USER` | Usuario de la base de datos | `postgres` |
| `PASSWORD` | Contraseña de la base de datos | `postgres` |
| `SECRET` | Clave secreta para JWT | `tu-clave-secreta-muy-larga-y-segura` |

### Frontend

El frontend usa la URL de la API configurada en `src/services/api.js` y `src/services/auth.js`. Por defecto apunta a `http://localhost:8080/api/v1`.

---

## 📖 Documentación API

La documentación interactiva de la API está disponible en:

- **Swagger UI**: `http://localhost:8080/api/v1/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/api/v1/v3/api-docs`

---



## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es parte de un challenge técnico.

---

## 👤 Autor

**ejcondorf88**

- GitHub: [@ejcondorf88](https://github.com/ejcondorf88)

---

