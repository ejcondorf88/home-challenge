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
        "id": "integer",
        "name": "string",
        "openingTime": "string",
        "closingTime": "string",
        "coordinates": "string",
        "user": {
          "id": "integer",
          "username": "string",
          "email": "string",
          "name": "string",
          "lastName": "string",
          "rol": "ENUM_ROLE"
        }
      }
    ]
    ```

- **🔍 Obtener Zona por ID**
  - **GET** `/api/zones/{id}`
  - **Respuesta**:
    ```json
    {
      "id": "integer",
      "name": "string",
      "openingTime": "string",
      "closingTime": "string",
      "coordinates": "string",
      "user": {
        "id": "integer",
        "username": "string",
        "email": "string",
        "name": "string",
        "lastName": "string",
        "rol": "ENUM_ROLE"
      }
    }
    ```

- **➕ Crear Nueva Zona**
  - **POST** `/api/zones`
  - **Body**:
    ```json
    {
      "name": "string",
      "openingTime": "string",
      "closingTime": "string",
      "coordinates": "string"
    }
    ```

- **✏️ Actualizar Zona**
  - **PUT** `/api/zones/{id}`
  - **Body**:
    ```json
    {
      "name": "string",
      "openingTime": "string",
      "closingTime": "string",
      "coordinates": "string"
    }
    ```

- **❌ Eliminar Zona**
  - **DELETE** `/api/zones/{id}`

