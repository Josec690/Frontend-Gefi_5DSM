import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../styles/EstiloPerfilUser';
import perfilIcon from '../assets/Perfil.png';
import seta from '../assets/seta.png';
import api from '../services/api'; // API para pegar dados do usuário

export default function TelaPerfilUser() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState({ nome: '', email: '' });
  const [loading, setLoading] = useState(true);

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
        <Text style={{ color: '#fff' }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

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
          onPress={() => navigation.navigate('TelaFinancas')}>
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

        <TouchableOpacity style={styles.botaoSair} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textoBotao}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
