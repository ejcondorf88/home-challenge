export const validateForm = (data) => {
  const errors = {};

  if (!data.email) {
    errors.email = "Email is required";
  }

  if (!data.name) {
    errors.name = "Name is required";
  }

  if (!data.lastName) {
    errors.lastName = "Last name is required";
  }

  if (!data.identification) {
    errors.identification = "Identification is required";
  } else if (data.identification.length < 10) {
    errors.identification = "Identification must be at least 10 characters";
  }

  if (!data.coordenadasDomicilio) {
    errors.coordenadasDomicilio = "Location coordinates are required";
  }

  if (!data.rol) {
    errors.rol = "Role is required";
  }

  return errors;
};

export const validateLoginForm = (data) => {
  const errors = {};

  if (!data.userName) {
    errors.userName = "User name is required";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
};
