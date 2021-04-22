import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import { EnvironmentButton } from "../components/EnvironmentButton";
import { useNavigation } from "@react-navigation/core";

import { Header } from "../components/Header";
import { Load } from "../components/Load";
import { PlantCardPrimary } from "../components/PlantCardPrimary";

import { api } from "../services/api";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { PlantProps } from "../libs/storage";

interface EnvironmentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [activeEnvironment, setActiveEnvironment] = useState<string>("all");
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const navigation = useNavigation();

  function handleOnPressEnvironmentButton(key: string) {
    setActiveEnvironment(key);

    if (key === "all") {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter(plant => plant.environments.includes(key));

    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage(previousValue => previousValue + 1);
    fetchPlants();
  }

  function handleSelectPlant(plant: PlantProps) {
    navigation.navigate("PlantSave", { plant });
  }

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&order=asc&_page=${page}&_limit=8`
    );

    if (!data) {
      return setIsLoading(true);
    }

    if (page > 1) {
      setPlants(previousValue => [...previousValue, ...data]);
      setFilteredPlants(previousValue => [...previousValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setIsLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    async function fetchEnvironments() {
      const { data } = await api.get(
        "/plants_environments?_sort=title&order=asc"
      );

      setEnvironments([
        {
          key: "all",
          title: "Todos"
        },
        ...data
      ]);
    }

    fetchEnvironments();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (isLoading) {
    return <Load />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={environments}
          renderItem={({ item }) => (
            <EnvironmentButton
              key={item.key}
              title={item.title}
              active={item.key === activeEnvironment}
              onPress={() => handleOnPressEnvironmentButton(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          renderItem={({ item }) => (
            <PlantCardPrimary
              key={String(item.id)}
              data={{
                name: item.name,
                photo: item.photo
              }}
              onPress={() => handleSelectPlant(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    paddingHorizontal: 30
  },
  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },
  environmentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 30,
    marginVertical: 32
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center"
  }
});
