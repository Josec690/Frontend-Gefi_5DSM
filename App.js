import React, { useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as NavigationBar from 'expo-navigation-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

import Grafico from './assets/Grafico1.png';
import TelaCadastro from './screens/TelaCadastro';
import TelaLogin from './screens/TelaLogin';
import Usuario from './screens/TelaUsuario';
import TelaPerguntas from './screens/TelaPerguntas';
import TelaFinancas from './screens/TelaFinancas'; 
import TelaPerfil from './screens/TelaPerfil'; 
import TelaInvestimento from './screens/TelaInvestimento'; 
import stylesDefault, { makeAppStyles } from './styles/EstiloApp';
import TelaPerfilUser from './screens/TelaPerfilUser';
import TelaConfig from './screens/TelaConfig';
import TelaAlterarSenha from './screens/TelaAlterarSenha';
import TelaRecuperarSenha from './screens/TelaRecuperarSenha';
import { ThemeProvider, useAppTheme } from './context/ThemeContext';


const Stack = createNativeStackNavigator();

function IntroScreen({ navigation, styles }) {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
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

function AppInner() {
  const { colors, themeName, setTheme, toggleTheme } = useAppTheme();
  const styles = useMemo(() => makeAppStyles(colors), [colors]);

  useEffect(() => {
    // Deixa o app em tela cheia (oculta a barra de navegação)
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBackgroundColorAsync('transparent');
  }, []);

  const navTheme = useMemo(() => {
    const base = themeName === 'dark' ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        background: colors.background,
        text: colors.text,
        card: colors.card,
        border: colors.border,
        primary: colors.primary,
      },
    };
  }, [themeName, colors]);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Intro">
            {(props) => <IntroScreen {...props} styles={styles} />}
          </Stack.Screen>
          <Stack.Screen name="Cadastro" component={TelaCadastro} />
          <Stack.Screen name="TelaPerguntas" component={TelaPerguntas} />
          <Stack.Screen name="Login" component={TelaLogin} />
          <Stack.Screen name="RecuperarSenha" component={TelaRecuperarSenha} />
          <Stack.Screen name="Usuario" component={Usuario} />
          <Stack.Screen name="TelaFinancas" component={TelaFinancas}/>
          <Stack.Screen name="Investimentos" component={TelaInvestimento} />
          <Stack.Screen name="PerfilUser" component={TelaPerfilUser} />
          <Stack.Screen name="Config" component={TelaConfig} />
          <Stack.Screen name="AlterarSenha" component={TelaAlterarSenha} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* Toggle Sol/Lua flutuante */}
      <View
        style={{
          position: 'absolute',
          top: 50,
          right: 16,
          padding: 6,
          backgroundColor: colors.card,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          elevation: 6,
        }}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          onPress={() => setTheme('light')}
          accessibilityRole="button"
          accessibilityLabel="Ativar tema claro"
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: themeName === 'light' ? 'rgba(8,156,1,0.25)' : 'transparent',
            borderWidth: themeName === 'light' ? 1 : 0,
            borderColor: themeName === 'light' ? colors.border : 'transparent',
          }}
        >
          <Feather name="sun" size={18} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTheme('dark')}
          accessibilityRole="button"
          accessibilityLabel="Ativar tema escuro"
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: themeName === 'dark' ? 'rgba(8,156,1,0.25)' : 'transparent',
            borderWidth: themeName === 'dark' ? 1 : 0,
            borderColor: themeName === 'dark' ? colors.border : 'transparent',
          }}
        >
          <Feather name="moon" size={18} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
