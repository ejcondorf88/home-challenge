#!/bin/bash
set -e

# Actualizar sistema
dnf update -y

# Instalar Git
dnf install -y git

# Instalar Docker
dnf install -y docker
systemctl start docker
systemctl enable docker

# Agregar ec2-user al grupo docker
usermod -aG docker ec2-user

# Ejecutar contenedor (ahora Docker puede usar el puerto 80)
#En la instancia ec2 se debe hacer el export de las variables de entorno que esta en env.template
# export DATABASE_URL=jdbc:postgresql://dpg-d5ipuc1r0 
docker container run -d -p 80:80 --name fronted ejcondorf88/fronted:1.5.0
#docker container run -d -p 8080:8080 --name backend ejcondorf88/backend:1.5.0
docker network create fronted-backend-network
docker network connect fronted-backend-network fronted
#docker network connect fronted-backend-network backend
docker volume create portainer_data
docker container run -d -p 9000:9000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
