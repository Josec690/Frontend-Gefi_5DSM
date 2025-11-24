import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import stylesDefault, { makeStyles } from '../styles/EstiloPerfilUser';
import perfilIcon from '../assets/Perfil.png';
import seta from '../assets/seta.png';
import api from '../services/api'; // API para pegar dados do usuário
import { useAppTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function TelaPerfilUser() {
  const navigation = useNavigation();
  const { colors, themeName } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [usuario, setUsuario] = useState({ nome: '', email: '' });
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Carregar dados do usuário ao focar na tela
  useFocusEffect(
    React.useCallback(() => {
      const carregarUsuario = async () => {
        try {
          const response = await api.get('/usuario'); // pegar dados do usuário logado
          setUsuario(response.data);
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
        } finally {
          setLoading(false);
        }
      };

      carregarUsuario();
    }, [])
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: colors.text }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

      {/* Seta de voltar */}
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Image source={seta} style={styles.iconeSeta} />
      </TouchableOpacity>

      {/* Imagem de perfil */}
      <Image source={perfilIcon} style={styles.imagemPerfil} />

      {/* Nome e e-mail do usuário logado */}
      <Text style={styles.nomeUsuario}>{usuario.nome}</Text>
      <Text style={styles.emailUsuario}>{usuario.email}</Text>

      {/* Container dos botões */}
      <View style={styles.containerBotoes}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Usuario', { screen: 'Financas' })}>
          <Text style={styles.textoBotao}>Minhas Atividades</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate('Config')}>
          <Text style={styles.textoBotao}>Configurações</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textoBotao}>Ajuda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoSair} onPress={handleLogout}>
          <Text style={styles.textoBotao}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
