//Api para loguear al usuario
export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://192.168.1.37:8080/usuarios/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        contrasenia: password,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Api para registrar un usuaio
export const registrarUsuario = async (
  name,
  lastName,
  email,
  phoneNumber,
  password
) => {
  try {
    const response = await fetch("http://192.168.1.37:8080/usuarios/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: name,
        apellido: lastName,
        email: email,
        telefono: phoneNumber,
        contrasenia: password,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Api para conseguir usuario por ID
export const obtenerUsuario = async (id) => {
  try {
    const response = await fetch(`http://192.168.1.37:8080/usuarios/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
