import React from "react";
import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import { Feather } from "@expo/vector-icons";

import wateringImg from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate("UserIdentification");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie{"\n"}
          suas plantas de{"\n"}
          forma fácil
        </Text>
        <Image style={styles.image} source={wateringImg} resizeMode="contain" />
        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas{"\n"}
          plantas. Nós cuidamos de lembrar você{"\n"}
          sempre que precisar.
        </Text>
        <TouchableOpacity
          onPress={handleStart}
          style={styles.button}
          activeOpacity={0.7}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    color: colors.heading,
    marginTop: 24,
    fontFamily: fonts.heading,
    lineHeight: 34
  },
  image: {
    height: Dimensions.get("window").width * 0.7
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56
  },
  buttonIcon: {
    fontSize: 24,
    color: colors.white
  }
});
