import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Confirmation() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😁</Text>

        <Text style={styles.title}>Prontinho</Text>

        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <Button title="Começar" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  content: {
    padding: 30,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginTop: 15,
    color: colors.heading,
    fontFamily: fonts.heading,
    fontSize: 22,
    lineHeight: 38,
    textAlign: "center"
  },
  subtitle: {
    marginTop: 20,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 17,
    textAlign: "center"
  },
  emoji: {
    fontSize: 78
  },
  footer: {
    marginTop: 30,
    paddingHorizontal: 50,
    width: "100%"
  }
});
