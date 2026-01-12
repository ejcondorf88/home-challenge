# ---------- DEPENDENCIAS----------
FROM node:20-alpine AS deps
WORKDIR /app


# Copiar solo archivos de dependencias
COPY package*.json ./

# Instalar dependencias (incluye devDependencies para el build)
RUN npm install --force


# ---------- CONSTRUCCION ----------
FROM node:20-alpine AS build
WORKDIR /app

# Reutilizar node_modules de la etapa deps
COPY --from=deps /app/node_modules ./node_modules

# Copiar el resto del código
COPY . .

# Construir la app (Vite / React / etc.)
RUN npm run build


# ---------- EJECUCION ----------
FROM nginx:alpine

# Copiar el build al directorio público de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# (Opcional) Configuración personalizada de nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
