import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Grafico from './assets/Grafico1.png';
import TelaCadastro from './TelaCadastro';
import TelaLogin from './TelaLogin';
import Usuario from './TelaUsuario';
import TelaPerguntas from './TelaPerguntas'; 
import styles from './Estilos/EstiloApp';

const Stack = createNativeStackNavigator();

function TelaIntro({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Text style={styles.title}>Gefi</Text>
      <Image source={Grafico} style={styles.image} />
      <Text style={styles.text}>
        Dê os primeiros passos para a sua independência financeira.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.buttonText}>Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={TelaIntro} />
        <Stack.Screen name="Cadastro" component={TelaCadastro} />
        <Stack.Screen name="TelaPerguntas" component={TelaPerguntas} /> 
        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="Usuario" component={Usuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
