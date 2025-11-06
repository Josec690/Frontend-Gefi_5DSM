import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Grafico from './assets/Grafico1.png';
import TelaCadastro from './screens/TelaCadastro';
import TelaLogin from './screens/TelaLogin';
import Usuario from './screens/TelaUsuario';
import TelaPerguntas from './screens/TelaPerguntas';
import TelaFinancas from './screens/TelaFinancas'; // ✅ Import da tela de finanças
import TelaPerfil from './screens/TelaPerfil'; // ✅ Import da tela de perfil
import styles from './styles/EstiloApp';
import TelaPerfilUser from './screens/TelaPerfilUser';
import TelaConfig from './screens/TelaConfig';
import TelaAlterarSenha from './screens/TelaAlterarSenha';


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
  useEffect(() => {
    // Deixa o app em tela cheia (oculta a barra de navegação)
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBackgroundColorAsync('transparent');
  }, []);

  return (
    <>
      <StatusBar hidden />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Intro" component={TelaIntro} />
          <Stack.Screen name="Cadastro" component={TelaCadastro} />
          <Stack.Screen name="TelaPerguntas" component={TelaPerguntas} />
          <Stack.Screen name="Login" component={TelaLogin} />
          <Stack.Screen name="Usuario" component={Usuario} />
          <Stack.Screen name="TelaFinancas" component={TelaFinancas}/>
          <Stack.Screen name="PerfilUser" component={TelaPerfilUser} />
          <Stack.Screen name="Config" component={TelaConfig} />
          <Stack.Screen name="AlterarSenha" component={TelaAlterarSenha} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
