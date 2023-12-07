import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterSreen({ navigation }: Props) {
  return (
    <SafeAreaView>
      <Text>Registrate Ahora</Text>
    </SafeAreaView>
  );
}
