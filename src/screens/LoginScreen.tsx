import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToRegisterScreen = () => {
    navigation.navigate("Register");
  };

  const loginUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/usuarios/signup", {
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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/usuarios`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      style={styles.containerLoginForm}
      source={{
        uri: "https://img.freepik.com/free-vector/abstract-blur-blue-pink-gradient-background-design_53876-136695.jpg?size=626&ext=jpg&ga=GA1.1.240383335.1690498541&semt=ais",
      }}
    >
      <View style={styles.loginForm}>
        <Text style={styles.titleLogin}>Iniciar sesión</Text>
        <View style={styles.loginFormInputs}>
          <Text style={styles.labelInput}>Email</Text>
          <TextInput
            value={email}
            placeholder="ejemplo@email.com"
            onChangeText={(newEmail) => setEmail(newEmail)}
            style={styles.textInput}
          />
          <Text style={styles.labelInput}>Contraseña</Text>
          <TextInput
            value={password}
            placeholder="abc123"
            onChangeText={(newPassword) => setPassword(newPassword)}
            style={styles.textInput}
          />
        </View>
        <Pressable style={styles.loginButton} onPress={getUsers}>
          <Text style={styles.textLoginButton}>Iniciar sesión</Text>
        </Pressable>

        <View style={styles.registerLinkContainer}>
          <Text>¿No tienes cuenta?</Text>
          <Pressable onPress={goToRegisterScreen}>
            <Text style={styles.registerButton}>Registrate</Text>
          </Pressable>
        </View>
        <Text style={styles.textCondicionesContainter}>
          Iniciando sesión significa que aceptas los{" "}
          <Text style={styles.textCondiciones}>Términos y Condiciones</Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerLoginForm: {
    flex: 1,
    backgroundColor: "#b33e82",
    alignItems: "center",
    justifyContent: "center",
  },
  loginForm: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "70%",
  },
  loginFormInputs: {
    alignSelf: "flex-start",
    width: "100%",
  },
  titleLogin: {
    fontSize: 24,
    fontWeight: "500",
    color: "#8f898e",
    marginBottom: 15,
  },
  labelInput: {
    fontSize: 14,
    color: "#f07ab5",
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#e0dedf",
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: "#f07ab5",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  textLoginButton: {
    color: "white",
  },
  registerLinkContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  registerButton: {
    color: "#f07ab5",
    textDecorationLine: "underline",
  },
  textCondicionesContainter: {
    textAlign: "center",
    marginTop: 10,
    color: "gray",
  },
  textCondiciones: {
    color: "black",
    fontWeight: "bold",
  },
});
