//PARA CREAR UNA INSTANCIA EC2 NECESITAMOS:
//GRAR UN KEY PAIR Y ASIGNARLO A LA INSTANCIA
//GRUPO DE SEGURIDAD QUE PERMITA EL TRÁFICO SSH (PUERTO 22) Y HTTP (PUERTO 80)
// AMI DE AMAZON LINUX 2
//TIPO DE INSTANCIA t2.micro
//KEY PAIR
//ARCHIVO DE ARRAQNQUE PARA INSTALAR NGNIX Y DOCKER
//ASIGNAR UNA IP ELÁSTICA A LA INSTANCIA ES SALIDA DE LA INSTANCA
//ELB PARA DISTRIBUIR EL TRÁFICO

resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = var.rsa_bits
}

# 2. Crear el key pair en AWS
resource "aws_key_pair" "deployer" {
  key_name   = var.key_pair_name
  public_key = tls_private_key.ssh_key.public_key_openssh
}
# 3. Guardar la llave privada localmente
resource "local_file" "ssh_key" {
  content         = tls_private_key.ssh_key.private_key_pem
  filename        = "${path.module}/mi-keypair.pem"
  file_permission = "0400"
  
  # Provisioner para arreglar permisos en Windows
  provisioner "local-exec" {
    command = <<-EOT
      icacls "${path.module}/mi-keypair.pem" /inheritance:r
      icacls "${path.module}/mi-keypair.pem" /grant:r "$env:USERNAME`:R"
    EOT
    interpreter = ["PowerShell", "-Command"]
  }
}
resource "aws_instance" "infra_instance" {
  ami           = var.ami_id // Amazon Linux 3 AMI en us-west-1
  instance_type = "t2.micro"
  key_name      = aws_key_pair.deployer.key_name
  security_groups = [aws_security_group.infra_sg.name]
  user_data = file(var.user_data_path)
  tags = {
    Name = var.instance_name
  }
  
}
resource "aws_security_group" "infra_sg" {
  name        = "infra-sg"
  description = "Security group for infra instance"

  ingress {
    from_port   = var.allowed_ingress_ports[0]
    to_port     = var.allowed_ingress_ports[0]
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = var.allowed_ingress_ports[1]
    to_port     = var.allowed_ingress_ports[1]
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
