import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ScrollView
} from "react-native";

import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Header } from "../components/Header";

import waterdropImg from "../assets/waterdrop.png";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { loadPlants, PlantProps } from "../libs/storage";
import { PlantCardSecondary } from "../components/PlantCardSecondary";

export function MyPlants() {
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nextWatered, setNextWatered] = useState<string>("");

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlants();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {
          locale: ptBR
        }
      );

      setNextWatered(
        `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}`
      );

      setPlants(plantsStoraged);
      setIsLoading(false);
    }

    loadStorageData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header />

        <View style={styles.spotlight}>
          <Image style={styles.spotlightImage} source={waterdropImg} />
          <Text style={styles.spotlightText}>{nextWatered}</Text>
        </View>

        <View style={styles.plants}>
          <Text style={styles.plantsTitle}>Próximas regadas</Text>

          <FlatList
            data={plants}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <PlantCardSecondary data={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  spotlightImage: {
    width: 60,
    height: 60
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: "justify",
    fontFamily: fonts.text
  },
  plants: {
    flex: 1,
    width: "100%"
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20
  }
});
