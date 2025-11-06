import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StatusBar, 
  Image, 
  ActivityIndicator, 
  RefreshControl, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../services/api';
import styles from '../styles/EstiloPerfil'; 

import perfilIcon from '../assets/Perfil.png';
import iconeSaidaGota from '../assets/Gota.png'; 
import iconeSaidaRaio from '../assets/Raio.png';

export default function PerfilScreen() {
  const navigation = useNavigation(); // 👈 Hook para navegar entre telas

  const [usuario, setUsuario] = useState(null);
  const [balanco, setBalanco] = useState(0);
  const [proximasSaidas, setProximasSaidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  const carregarDados = async () => {
    try {
      const responseUsuario = await api.get('/usuario');
      setUsuario(responseUsuario.data);

      const hoje = new Date();
      const mes = hoje.getMonth() + 1;
      const ano = hoje.getFullYear();
      const responseBalanco = await api.get(`/balanco?mes=${mes}&ano=${ano}`);
      setBalanco(responseBalanco.data.balanco);

      const responseSaidas = await api.get('/proximas-saidas');
      setProximasSaidas(responseSaidas.data.slice(0, 2));

    } catch (error) {
      console.error('Erro ao carregar dados do perfil:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

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

      {/* NAVBAR COM BOTÃO DE PERFIL */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate('PerfilUser')}>
          <Image source={perfilIcon} style={styles.profileIcon} />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Bem-vindo, {usuario?.nome || 'Usuário'}</Text>
          <Text style={styles.cpfText}>{formatarCPF(usuario?.cpf)}</Text>
        </View>
      </View>

      {/* CARD DO BALANÇO */}
      <View style={styles.balancoCard}>
        <Text style={styles.balancoCardTitle}>Previsão de saldo</Text>
        <Text style={styles.balancoValorText}>
          R$ {balanco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </Text>
      </View>

      {/* TÍTULO PRÓXIMAS SAÍDAS */}
      <View style={styles.proximasSaidasTitleContainer}>
        <Text style={styles.proximasSaidasTitle}>Próximas Saídas</Text>
      </View>

      <TouchableOpacity 
        activeOpacity={0.8}
        onPress={() => navigation.navigate('TelaFinancas')} // 👈 leva pra tela desejada
      >
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
      {/* CARDS PRÓXIMAS SAÍDAS */}
      <View style={styles.proximasSaidasCard}>
        <View style={styles.horizontalCardsContainer}>
          {proximasSaidas.length > 0 ? (
            proximasSaidas.map((saida, index) => (
              <View 
                key={saida.id} 
                style={index === 0 ? styles.horizontalCardOne : styles.horizontalCardTwo}
              >
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
      </TouchableOpacity>
    </ScrollView>
  );
}
