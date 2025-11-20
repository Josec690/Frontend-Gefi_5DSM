import React, { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import PerfilScreen from './TelaPerfil';
import InvestScreen from './TelaInvestimento';
import FinancasScreen from './TelaFinancas';
import stylesDefault, { makeStyles } from '../styles/EstiloPerfil';
import { useAppTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();

export default function UsuarioTabs() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#57FF5A',
        tabBarInactiveTintColor: '#555',
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Financas') {
            return <FontAwesome name="balance-scale" size={size} color={color} />;
          } else if (route.name === 'Perfil') {
            return <Ionicons name="person-circle" size={size} color={color} />;
          } else if (route.name === 'Investimentos') {
            return <Ionicons name="trending-up" size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Perfil" component={PerfilScreen} />
      <Tab.Screen name="Investimentos" component={InvestScreen} />
      <Tab.Screen name="Financas" component={FinancasScreen} />
    </Tab.Navigator>
  );
}
