import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet, SafeAreaView } from "react-native";
import { obtenerUsuario } from "../api/auth.api";
import Colors from "../assets/Colors";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [user, setUser] = useState<any>(null);

  const handleSingOut = async () => {
    try {
      // Establece el valor de "@user" en AsyncStorage a null,
      // lo que efectivamente borra los datos del usuario actual.
      await AsyncStorage.setItem("@user", JSON.stringify(null));

      // Redirige al usuario a la pantalla de inicio de sesión.
      navigation.navigate("Login");
    } catch (error) {
      // Si algo sale mal al intentar borrar los datos del usuario o navegar,
      // registra el error en la consola.
      console.error("Error al cerrar sesion:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("@user");
        if (userData !== null) {
          const actualUser = await obtenerUsuario(userData);
          setUser(actualUser);
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.homeContainer}>
      {user ? (
        <Text style={styles.titleHome}>Bienvenido, {user.nombre}</Text>
      ) : (
        <Text style={styles.titleHome}>Cargando...</Text>
      )}
      <Pressable style={styles.btnSingOut} onPress={handleSingOut}>
        <Text style={styles.btnSingOutText}>Cerrar sesión</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleHome: {
    fontSize: 24,
    color: Colors.grayText,
    marginBottom: 20,
  },
  btnSingOut: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  btnSingOutText: {
    color: Colors.white,
    fontSize: 16,
  },
});
