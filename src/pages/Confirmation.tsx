import React from "react";
import { useNavigation, useRoute } from "@react-navigation/core";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: "smile" | "hug";
  nextScreen: string;
}

const emojis = {
  hug: "🤗",
  smile: "😁"
};

export function Confirmation() {
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTitle,
    icon,
    nextScreen
  } = routes.params as Params;

  function handleOnPress() {
    navigation.navigate(nextScreen);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subtitle}>{subtitle}</Text>

        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleOnPress} />
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
