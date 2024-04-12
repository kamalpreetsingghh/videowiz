import { StyleSheet, Text, View } from "react-native";
import { Slot } from "expo-router";
import React from "react";

const RootLayout = () => {
  return <Slot />;
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
