import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import PerfilScreen from "./PerfilScreen";
import InvestScreen from "./TelaInvestimento";
import styles from "./Estilos/EstiloPerfil";

const Tab = createBottomTabNavigator();

export default function UsuarioTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#57FF5A",
        tabBarInactiveTintColor: "#555",
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Perfil") {
            iconName = "person-circle";
          } else if (route.name === "Investimentos") {
            iconName = "trending-up";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Investimentos" component={InvestScreen} />
    </Tab.Navigator>
  );
}
