import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ToastAndroid,
} from "react-native";
import StyledTextInput from "../components/StyledTextInput";
import Colors from "../assets/Colors";
import { registrarUsuario } from "../api/auth.api";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterSreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSingUp = async () => {
    if (!name || !lastName || !phoneNumber || !email || !password) {
      ToastAndroid.show(
        "Los campos no pueden estar vacios",
        ToastAndroid.SHORT
      );
      return;
    }
    try {
      const data = await registrarUsuario(
        name,
        lastName,
        email,
        Number(phoneNumber),
        password
      );
      if (typeof data.message == "string") {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
        console.log(data);
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
    <SafeAreaView style={styles.containerRegisterForm}>
      <Text style={styles.titleRegisterForm}>Completá con tus datos</Text>
      <View style={styles.registerForm}>
        <StyledTextInput
          label="Nombres"
          setNewValue={setName}
          placeholder="Nombres"
          isComplete={name.length == 0 ? false : true}
          details={true}
        />
        <StyledTextInput
          label="Apellidos"
          setNewValue={setLastName}
          placeholder="Apellidos"
          isComplete={lastName.length == 0 ? false : true}
          details={true}
        />
        <StyledTextInput
          label="Teléfono"
          setNewValue={setPhoneNumber}
          placeholder="Teléfono"
          isComplete={phoneNumber.length == 0 ? false : true}
          details={true}
          keyboardType="numeric"
        />
        <StyledTextInput
          label="Correo electrónico"
          setNewValue={setEmail}
          placeholder="Correo electrónico"
          isComplete={email.length == 0 ? false : true}
          details={true}
        />
        <StyledTextInput
          label="Contraseña"
          setNewValue={setPassword}
          placeholder="Contraseña"
          isComplete={password.length == 0 ? false : true}
          details={true}
          secureTextEntry={true}
        />
      </View>
      <Pressable style={styles.registerBtn} onPress={handleSingUp}>
        <Text style={styles.registerBtnText}>Registrate</Text>
        <View style={styles.iconBtnRegister}>
          <Image
            source={require("../assets/arrow.png")}
            style={{ width: 20, height: 20 }}
          />
        </View>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerRegisterForm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  titleRegisterForm: {
    fontSize: 24,
    color: Colors.grayText,
    fontWeight: "bold",
    marginBottom: 40,
  },
  registerForm: {
    width: "100%",
  },
  registerBtn: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#fff", // Cambia esto al color de fondo que prefieras
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerBtnText: {
    fontSize: 18,
    marginBottom: 2,
    color: Colors.grayText,
  },
  iconBtnRegister: {
    backgroundColor: Colors.secondary,
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
