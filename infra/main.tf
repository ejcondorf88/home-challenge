resource "aws_ec2_host" "example" {
  availability_zone = "us-west-2a"
  instance_type     = "m5.large"
    tags = {
        Name = "example-host"
    }
}