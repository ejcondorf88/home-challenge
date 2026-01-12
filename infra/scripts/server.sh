#!/bin/bash
set -e

# Actualizar sistema
dnf update -y

# Instalar Nginx
dnf install -y nginx
systemctl start nginx
systemctl enable nginx

# Instalar Git
dnf install -y git

# Instalar Docker
dnf install -y docker
systemctl start docker
systemctl enable docker

# Agregar ec2-user al grupo docker
usermod -aG docker ec2-user

# Permisos correctos
newgrp docker || true
