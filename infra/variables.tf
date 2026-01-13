
// La descricion de las variables va a ser en español pero es recomendable usar inglés en proyectos reales

variable "key_pair_name" {
  description = "Nombre del key pair"
  type        = string
  default     = "mi-keypair"
}

variable "ami_id" {
  description = "AMI de Amazon Linux"
  type        = string
  default     = "ami-07ff62358b87c7116" // Amazon Linux 3 AMI en us-west-1
}

variable "instance_name" {
  description = "Nombre de la instancia EC2"
  type        = string
  default     = "infra-instance"
}

variable "user_data_path" {
  description = "Ruta del script de arranque"
  type        = string
  default     = "scripts/server.sh"
}


variable "rsa_bits" {
  description = "Bits de la llave RSA"
  type        = number
  default     = 4096
}


variable "allowed_ingress_ports" {
  description = "Puertos permitidos en el Security Group"
  type        = list(number)
  default     = [22, 80, 9000]
}
