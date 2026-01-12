# Kanteritas Kruger Challenge

Este repositorio contiene la implementación del **Kanteritas Kruger Challenge**, un sistema diseñado para gestionar clientes y programar interrupciones en los sectores. La aplicación incluye dos roles: **Administrador** y **Cliente**, con funcionalidades específicas para cada uno.

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Spring Boot**: Framework de Java para el desarrollo de la API REST.
- **Supabase**: Base de datos en la nube basada en **PostgreSQL**.
- **Spring Data JPA**: Abstracción para trabajar con bases de datos relacionales.
- **Spring Security**: Autenticación y autorización de usuarios.
- **Lombok**: Simplificación del código con anotaciones Java.
- **Maven**: Herramienta para gestionar dependencias y construir el proyecto.

### Frontend
- **React**: Biblioteca para construir interfaces de usuario dinámicas.
- **Vite**: Herramienta de desarrollo rápida y ligera.
- **PrimeReact**: Componentes de UI estilizados para React.
- **CSS**: Estilización de la aplicación.

---

## 🌟 Características Principales

- **Roles de Usuario**:
  - **Administrador**: Gestión de usuarios, asignación de zonas y programación de interrupciones(En desarrollo la parte del fronted).
  - **Cliente**: Visualización de interrupciones programadas y detalles personales.
- **Base de datos en la nube**: Uso de **Supabase** para almacenar información de usuarios, roles, zonas y registros de interrupciones.
- **Seguridad**:
  - Autenticación y autorización robusta con **JWT (JSON Web Tokens)**.

---

## ⚙️ Configuración y Ejecución del Proyecto

### 🖥️ Prerrequisitos
- **Java 17** o superior.
- **Node.js** (versión 16+).
- **Maven** o **Gradle** instalado.
- **Supabase** configurado con las tablas necesarias:
  - Usuarios.
  - Roles.
  - Zonas.
  

### 📦 Backend (Spring Boot)

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/ejcondorf88/home-challenge.git
   cd home-challenge/backend
# Configuración de la base de datos
     spring.datasource.username=<USUARIO>
     spring.datasource.password=<CONTRASEÑA>
     spring.jpa.hibernate.ddl-auto=update

     # Configuración de JWT
     jwt.secret=<CLAVE_SECRETA_JWT>
     ```

3. Compilar y ejecutar el backend:
   ```bash
   mvn clean install
   mvn spring-boot:run
---

## 🔗 Configuración del Frontend (React con Vite)

1. Navegar a la carpeta del frontend:
   ```bash
   cd fronted
2. Instalar las dependencias necesarias:
   ```bash
   yarn add 
# Estructura de Base de Datos

## Diagrama Entidad-Relación
![image](https://github.com/user-attachments/assets/41070158-fdfe-40ec-aff4-e9cb0c4b5921)
## Relaciones

- **ENUM_ROLE ↔ USER**: 1:1 (Un usuario tiene un rol, rol único por usuario)
- **USER ↔ ZONE**: 1:1 (Un usuario tiene una zona, zona única por usuario)

## 📚 API REST Endpoints

### Autenticación y Usuarios

- **📝 Iniciar Sesión**
  - **POST** `/api/auth/login`
  - **Body**:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```

- **👤 Registro de Usuario**
  - **POST** `/api/auth/signup`
  - **Body**:
    ```json
    {
      "email": "string",
      "name": "string",
      "lastName": "string",
      "rol": "ENUM_ROLE"
    }
    ```

- **📋 Gestión de Usuarios**
  - **GET** `/api/users`: Obtener todos los usuarios
  - **GET** `/api/users/{id}`: Obtener usuario por ID
  - **PUT** `/api/users/{id}`: Actualizar usuario
  - **DELETE** `/api/users/{id}`: Eliminar usuario

### Gestión de Zonas

- **📍 Obtener Todas las Zonas**
  - **GET** `/api/zones`
  - **Respuesta**:
    ```json
    [
      {
        # Home Challenger — Proyecto

        Proyecto de ejemplo que contiene una API en Java (Spring Boot), un frontend en React (Vite) y configuración de infraestructura con Terraform.

        ## Estructura del repositorio

        - `backend/` — API Spring Boot (Java 17, Maven)
        - `fronted/` — Frontend con React + Vite
        - `infra/` — Terraform y scripts de despliegue

        ## Tecnologías

        - Backend: Spring Boot, Spring Security (JWT), Spring Data JPA, PostgreSQL, Maven
        - Frontend: React, Vite, PrimeReact, Leaflet
        - Infra: Terraform (AWS), Docker

        ## Quickstart — desarrollo local

        1) Backend (desde la carpeta raíz):

        ```bash
        cd backend
        mvn clean package
        mvn spring-boot:run
        ```

        La API por defecto escucha en el puerto `8080`. Endpoints de autenticación expuestos en `/auth`.

        2) Frontend (desarrollo):

        ```bash
        cd fronted
        npm install
        npm run dev
        ```

        Accede a la app en `http://localhost:5173` (o el puerto que indique Vite).

        3) Ejecutar con Docker (opcional)

        Backend (build y run):

        ```bash
        docker build -f backend/docker/DockerFile -t home-challenge-backend:latest ./backend
        docker run -p 8080:8080 home-challenge-backend:latest
        ```

        Frontend (build y run):

        ```bash
        docker build -f fronted/docker/Dockerfile -t home-challenge-frontend:latest ./fronted
        docker run -p 80:80 home-challenge-frontend:latest
        ```

        4) Infra (Terraform) — revisión/ejecución:

        ```bash
        cd infra
        terraform init
        terraform plan
        terraform apply
        ```

        ## Notas importantes y problemas conocidos

        - API URL en frontend: `fronted/src/services/api.js` usa `http://localhost:8080/api/v1/auth` mientras que el backend expone `/auth`. Esto rompe autentificación. Recomendación: actualizar `API_URL` a `http://localhost:8080/auth` o cambiar rutas del backend para mantener prefijo `/api/v1`.
        - Dependencia duplicada: `spring-boot-starter-security` aparece dos veces en `backend/pom.xml`. Eliminar la duplicación.
        - React está en versión RC en `fronted/package.json` (React 19 RC). Recomiendo fijar a una versión estable (ej. `^18.2.0`) para producción.
        - Terraform/Seguridad: el security group en `infra/main.tf` permite SSH (22) desde `0.0.0.0/0`. Restringir a rangos conocidos o usar bastion.
        - AMI hardcoded en `infra/main.tf`; parametrizar por región y/o variable.

        ## Endpoints principales

        - `POST /auth/login` — login
        - `POST /auth/signup` — registro
        - Resto de endpoints bajo `/user`, `/admin`, `/zones` según controladores en `backend/src/main/java/com/homechallenger/controller`.

        ## Recomendaciones rápidas (prioritarias)

        1. Corregir `fronted/src/services/api.js` para apuntar al endpoint correcto.
        2. Eliminar dependencia duplicada en `backend/pom.xml`.
        3. Restringir reglas de SSH en `infra/main.tf` y parametrizar AMI.
        4. Fijar React a versión estable en `fronted/package.json`.

        ## ¿Quieres que aplique estas correcciones ahora?

        Si quieres, puedo:

        - Corregir `fronted/src/services/api.js` (cambio inmediato)
        - Actualizar `backend/pom.xml` para eliminar duplicado
        - Sugerir cambios en `infra/main.tf` (ejemplo de seguridad)

        Indica cuáles aplico y procedo.

        ## Infra — Terraform y arquitectura (para prueba técnica)

        Objetivo: describir una arquitectura reproducible, segura y adecuada para una prueba técnica, y dar pasos/variables claras para desplegar.

        - Arquitectura propuesta (mínimo viable para la prueba):
          - VPC con subredes públicas y privadas.
          - Load Balancer público (ALB) en subredes públicas, que dirija tráfico a Servicios en subredes privadas.
          - Backend desplegado en ECS Fargate (o Auto Scaling Group de EC2) con imagen Docker; frontend servido por S3+CloudFront o Nginx en contenedor detrás del ALB.
          - Base de datos gestionada (RDS PostgreSQL) en subredes privadas o usar Supabase como servicio gestionado.
          - Secrets en AWS Secrets Manager o Parameter Store; no almacenar secretos en Terraform state sin cifrado.

        - Seguridad y buenas prácticas:
          - No permitir SSH desde `0.0.0.0/0`. Usar IPs permitidas o SSM Session Manager para acceso remoto.
          - Restringir IAM a principios de mínimo privilegio; usar roles por servicio (task role, instance profile, etc.).
          - Habilitar HTTPS en ALB (certificado ACM) y redirigir HTTP a HTTPS.
          - Logs y métricas: CloudWatch (aplicación + ALB + RDS). Añadir alertas básicas.

        - Estructura de Terraform recomendada (repositorio):
          - `infra/modules/` — módulos reutilizables (vpc, ecs, rds, alb, security-group)
          - `infra/envs/dev/` `infra/envs/prod/` — stacks por entorno que consumen módulos
          - `infra/scripts/` — helpers para `terraform fmt`/`validate`/`workspace`

        - Variables útiles (ejemplo mínimo para `infra/terraform.tfvars`):
          - `region = "us-west-1"`
          - `environment = "dev"`
          - `vpc_cidr = "10.0.0.0/16"`
          - `allowed_ssh_cidr = "YOUR_IP/32"`
          - `ami = "ami-..."` (parametrizar por región)

        - Comandos rápidos:

        ```bash
        cd infra
        terraform init
        terraform plan -var-file=terraform.tfvars
        terraform apply -var-file=terraform.tfvars
        ```

        - CI/CD recomendado para prueba técnica:
          - Pipeline en GitHub Actions / GitLab CI que haga:
            1. Lint y tests para backend y frontend.
            2. Build de imágenes Docker y push a registry (ECR/DockerHub).
            3. Run `terraform fmt`/`validate` and `terraform plan` (en entorno de PR).
            4. (manual) `terraform apply` en `main` o `prod` con `approval`.

        - Outputs y validaciones esperadas tras `apply`:
          - URL pública del ALB / CloudFront.
          - Endpoint de base de datos (si aplica), nombre del cluster/servicio.
          - ARN del role de ejecución y ubicación del bucket para artefactos.

        Notas finales: si quieres, puedo preparar una propuesta de `infra/` con módulos mínimos (VPC + ALB + ECS Fargate + RDS) y un ejemplo de pipeline CI (GitHub Actions) lista para ejecutar en la prueba técnica.


docker build -t ejcondorf88/fronted:1.4.0 --no-cache -f fronted\docker\Dockerfile .
docker push ejcondorf88/fronted:1.4.0 


docker build -t ejcondorf88/backend:1.4.0 --no-cache -f backend\docker\Dockerfile .
docker push ejcondorf88/backend:1.4.0



https://excalidraw.com/#json=HX2_8_Qp7GUkgmAbRNFp0,TMPO73YZQXBncnehG2F3AA