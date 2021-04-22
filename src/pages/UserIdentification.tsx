import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ToastAndroid
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const navigation = useNavigation();

  async function handleSubmit() {
    if (isFilled) {
      try {
        await AsyncStorage.setItem("@plantmanager:user", name);

        navigation.navigate("Confirmation", {
          title: "Prontinho",
          subtitle:
            "Agora vamos começar a cuidar das suas plantinhas com muito cuidado.",
          buttonTitle: "Começar",
          icon: "smile",
          nextScreen: "PlantSelect"
        });
      } catch {
        Alert.alert("Houve um erro na aplicação.");
      }
    } else {
      if (Platform.OS === "android") {
        ToastAndroid.show("Informe seu nome, por favor.", ToastAndroid.SHORT);
      } else {
        Alert.alert("Informe seu nome, por favor.");
      }
    }
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>{isFilled ? "😄" : "😀"}</Text>
                <Text style={styles.title}>Como podemos{"\n"}chamar você?</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && {
                    borderColor: colors.green
                  }
                ]}
                value={name}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <View style={styles.footer}>
                <Button
                  title="Confirmar"
                  disabled={!isFilled}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around"
  },
  content: {
    flex: 1,
    width: "100%"
  },
  form: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 54,
    alignItems: "center"
  },
  header: {
    alignItems: "center"
  },
  emoji: {
    fontSize: 44
  },
  title: {
    marginTop: 20,
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center"
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center"
  },
  footer: {
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 20
  }
});
