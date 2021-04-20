import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export function Button(props: ButtonProps) {
  const { title, disabled, ...rest } = props;

  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      activeOpacity={disabled ? 0.5 : 0.8}
      {...rest}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 16
  },
  disabled: {
    opacity: 0.5
  },
  text: {
    color: colors.white,
    fontFamily: fonts.heading,
    fontSize: 16
  }
});
