import React, { useState, useEffect } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  ImageBackground,
  ToastAndroid,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { loginUser } from "../api/auth.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../assets/Colors";
import StyledTextInput from "../components/StyledTextInput";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("@user");
        if (userData !== null && userData !== "null") {
          goToHomeScreen();
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    checkUser();
  }, []);

  const goToRegisterScreen = () => {
    navigation.navigate("Register");
  };

  const goToHomeScreen = () => {
    navigation.navigate("Home");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      ToastAndroid.show(
        "Los campos no pueden estar vacios",
        ToastAndroid.SHORT
      );
      return;
    }
    try {
      const data = await loginUser(email, password);
      if (typeof data.message == "string") {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      } else {
        // Guarda el id del usuario en AsyncStorage
        //console.log(data.usuarioEncontrado.id);
        try {
          await AsyncStorage.setItem(
            "@user",
            JSON.stringify(data.usuarioEncontrado.id)
          );
          setEmail(""); // Resetea el campo de correo electrónico
          setPassword(""); // Resetea el campo de contraseña
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          });
        } catch (error) {
          console.error("Error al guardar el usuario:", error);
        }
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show(
        "Ocurrio un error, vuelva a intentarlo",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <ImageBackground
      style={styles.containerLoginForm}
      source={require("../assets/loginScreenBg.jpg")}
    >
      <View style={styles.loginForm}>
        <Text style={styles.titleLogin}>Iniciar sesión</Text>
        <View style={styles.loginFormInputs}>
          <Text style={styles.labelInput}>Email</Text>
          <StyledTextInput
            label="Email"
            setNewValue={setEmail}
            placeholder="ejemplo@mail.com"
            isComplete={email.length == 0 ? false : true}
            details={false}
            value={email}
          />
          <Text style={styles.labelInput}>Contraseña</Text>
          <StyledTextInput
            label="Contraseña"
            setNewValue={setPassword}
            placeholder="abc123"
            isComplete={password.length == 0 ? false : true}
            secureTextEntry={true}
            details={false}
            value={password}
          />
        </View>
        <Pressable style={styles.loginButton} onPress={handleLogin}>
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
    alignItems: "center",
    justifyContent: "center",
  },
  loginForm: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    width: "75%",
    backgroundColor: Colors.white, // Cambia esto al color de fondo que prefieras
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginFormInputs: {
    alignSelf: "flex-start",
    width: "100%",
    gap: 3,
  },
  titleLogin: {
    fontSize: 24,
    fontWeight: "500",
    color: Colors.grayText,
    marginBottom: 15,
  },
  labelInput: {
    fontSize: 16,
    color: Colors.secondary,
  },
  loginButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    backgroundColor: Colors.secondary, // Cambia esto al color de fondo que prefieras
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textLoginButton: {
    color: Colors.white,
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
    color: Colors.secondary,
    textDecorationLine: "underline",
  },
  textCondicionesContainter: {
    textAlign: "center",
    marginTop: 10,
    color: Colors.grayText,
  },
  textCondiciones: {
    color: Colors.grayText,
    fontWeight: "bold",
  },
});
