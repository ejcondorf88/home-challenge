#!/bin/bash

# Actualizar el sistema
sudo dnf update -y

# Instalar Nginx
sudo dnf install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Instalar Git
sudo dnf install -y git

# Instalar Docker
sudo dnf install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo su 
# Agregar el usuario actual al grupo docker

