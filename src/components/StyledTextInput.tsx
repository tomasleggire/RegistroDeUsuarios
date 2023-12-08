import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import Colors from "../assets/Colors";

type InputProps = {
  label: string;
  placeholder: string;
  setNewValue: (newText: string) => void;
  isComplete: boolean;
  details: boolean;
};

export default function StyledTextInput({
  label,
  placeholder,
  setNewValue,
  isComplete,
  details,
  ...otherProps
}: InputProps & React.ComponentProps<typeof TextInput>) {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle = isFocused ? styles.focusedInput : styles.unfocusedInput;

  const inputLabelStyle = isFocused
    ? styles.focusedInputLabel
    : styles.unfocusedInputLabel;

  if (details) {
    return (
      <View style={styles.inputContainer}>
        <Text style={inputLabelStyle}>{label}</Text>
        <TextInput
          style={inputStyle}
          onChangeText={(newText) => setNewValue(newText)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...otherProps}
        />
        {isComplete ? (
          <Text style={styles.completeText}>Completo</Text>
        ) : (
          <Text style={styles.incompleteText}>Incompleto</Text>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={inputStyle}
          onChangeText={(newText) => setNewValue(newText)}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...otherProps}
        />
      </View>
    );
  }
}

const input = {
  paddingHorizontal: 12,
  paddingVertical: 15,
  fontSize: 18,
  borderRadius: 5,
};

const validateText = {
  marginLeft: 12,
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 5,
  },
  focusedInputLabel: {
    color: Colors.secondary,
    marginLeft: 12,
  },
  unfocusedInputLabel: {
    color: Colors.transparent,
  },
  focusedInput: {
    ...StyleSheet.flatten(input),
    backgroundColor: Colors.transparent,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 2,
    borderRadius: 0,
  },
  unfocusedInput: {
    ...StyleSheet.flatten(input),
    backgroundColor: Colors.primary,
  },
  incompleteText: {
    ...StyleSheet.flatten(validateText),
    color: Colors.grayText,
  },
  completeText: {
    ...StyleSheet.flatten(validateText),
    color: Colors.secondary,
  },
});
