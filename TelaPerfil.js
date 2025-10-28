import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from './services/api';
import styles from './Estilos/EstiloPerfil'; 

import perfilIcon from './assets/Perfil.png';
import iconeSaidaGota from './assets/Gota.png'; 
import iconeSaidaRaio from './assets/Raio.png';

export default function PerfilScreen() {
  const [usuario, setUsuario] = useState(null);
  const [balanco, setBalanco] = useState(0);
  const [proximasSaidas, setProximasSaidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarDados = async () => {
    try {
      // Buscar dados do usuário
      const responseUsuario = await api.get('/usuario');
      setUsuario(responseUsuario.data);

      // Buscar balanço mensal
      const hoje = new Date();
      const mes = hoje.getMonth() + 1;
      const ano = hoje.getFullYear();
      const responseBalanco = await api.get(`/balanco?mes=${mes}&ano=${ano}`);
      setBalanco(responseBalanco.data.balanco);

      // Buscar próximas saídas
      const responseSaidas = await api.get('/proximas-saidas');
      setProximasSaidas(responseSaidas.data.slice(0, 2)); // Pegar apenas 2

    } catch (error) {
      console.error('Erro ao carregar dados do perfil:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Carregar dados quando a tela ganhar foco
  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    carregarDados();
  };

  const formatarCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.substring(0, 3) + '.***.***-' + cpf.substring(9, 11);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#57FF5A" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#57FF5A" />
      }
    >
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.navbar}>
        <Image source={perfilIcon} style={styles.profileIcon} />
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Bem-vindo, {usuario?.nome || 'Usuário'}</Text>
          <Text style={styles.cpfText}>{formatarCPF(usuario?.cpf)}</Text>
        </View>
      </View>

      <View style={styles.balancoCard}>
        <Text style={styles.balancoCardTitle}>Balanço Mensal</Text>
        <Text style={styles.balancoValorText}>
          R$ {balanco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      </View>

      <View style={styles.proximasSaidasTitleContainer}>
        <Text style={styles.proximasSaidasTitle}>Próximas Saídas</Text>
      </View>

      <View style={styles.proximasSaidasCard}>
        <View style={styles.horizontalCardsContainer}>
          {proximasSaidas.length > 0 ? (
            proximasSaidas.map((saida, index) => (
              <View key={saida.id} style={index === 0 ? styles.horizontalCardOne : styles.horizontalCardTwo}>
                <Image 
                  source={index === 0 ? iconeSaidaGota : iconeSaidaRaio} 
                  style={index === 0 ? styles.iconImage1 : styles.iconImage2} 
                />
                <Text style={styles.ProximaSaidaValor}>
                  R$ {saida.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </Text>
                <Text style={styles.ProximaSaidaTitulo}>{saida.descricao}</Text>
                <Text style={styles.ProximaSaidaCategoria}>({saida.categoria})</Text>
          </View>
            ))
          ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>
                Nenhuma saída recorrente cadastrada
              </Text>
          </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}