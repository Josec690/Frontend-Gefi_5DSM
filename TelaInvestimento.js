import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from './services/api';
import styles from './Estilos/EstiloInvestimento';


export default function InvestScreen() {
  const [investimentos, setInvestimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarInvestimentos = async () => {
    try {
      const response = await api.get('/investimentos');
      setInvestimentos(response.data);
    } catch (error) {
      console.error('Erro ao carregar investimentos:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarInvestimentos();
    }, [])
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#57FF5A" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Carregando investimentos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Lista de Investimentos</Text>
      </View>

      <FlatList
        data={investimentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.investItem}>
            <Text style={styles.investName}>{item.nome}</Text>
            <Text style={styles.investType}>Tipo: {item.tipo}</Text>
            <Text style={styles.investYield}>Rendimento: {item.rendimento}</Text>
            <Text style={styles.investRisk}>Risco: {item.risco}</Text>
            <Text style={styles.investLiquidity}>Liquidez: {item.liquidez}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}
