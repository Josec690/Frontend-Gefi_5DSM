import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';
import stylesDefault, { makeStyles } from '../styles/EstiloInvestimento';
import { useAppTheme } from '../context/ThemeContext';


export default function InvestScreen() {
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [investimentos, setInvestimentos] = useState([]);
  const [emAlta, setEmAlta] = useState([]);
  const [tesouro, setTesouro] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarDados = async () => {
    try {
      const [respInvest, respAlta, respTesouro] = await Promise.all([
        api.get('/investimentos'),
        api.get('/investimentos/em-alta').catch(() => ({ data: [] })),
        api.get('/investimentos/tesouro').catch(() => ({ data: [] }))
      ]);
      
      setInvestimentos(respInvest.data);
      setEmAlta(respAlta.data);
      setTesouro(respTesouro.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    carregarDados();
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#57FF5A" />
        <Text style={{ color: colors.text, marginTop: 10 }}>Carregando investimentos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#57FF5A" />
        }
      >
      {/* Seção: Investimentos em Alta */}
      {emAlta.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}> Investimentos em Alta</Text>
          {emAlta.slice(0, 5).map((item, index) => (
            <View key={index} style={styles.investItem}>
              <View style={styles.investHeader}>
                <Text style={styles.investName}>{item.ticker}</Text>
                <Text style={[styles.investPrice, { color: '#57FF5A' }]}>
                  +{item.variacao_percentual?.toFixed(2)}%
                </Text>
              </View>
              <Text style={styles.investSubtext}>{item.nome}</Text>
              <Text style={styles.investPrice}>
                R$ {item.preco?.toFixed(2) || 'N/A'}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Seção: Tesouro Direto */}
      {tesouro.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}> Tesouro Direto</Text>
          {tesouro.map((item, index) => (
            <View key={index} style={styles.investItem}>
              <Text style={styles.investName}>{item.nome}</Text>
              <Text style={styles.investType}>Vencimento: {item.vencimento}</Text>
              <Text style={styles.investYield}>
                Taxa: {item.taxa_compra || 'Consultar'}
              </Text>
              {item.valor_minimo && (
                <Text style={styles.investSubtext}>Investimento mínimo: {item.valor_minimo}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Seção: Investimentos Recomendados */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Investimentos Recomendados</Text>
        {investimentos.map((item) => (
          <View key={item.id} style={styles.investItem}>
            <View style={styles.investHeader}>
              <Text style={styles.investName}>{item.nome}</Text>
              {item.preco ? (
                <Text style={styles.investPrice}>R$ {item.preco.toFixed(2)}</Text>
              ) : item.ticker && (
                <Text style={styles.investUnavailable}>Cotação indisponível</Text>
              )}
            </View>
            <Text style={styles.investType}>Tipo: {item.tipo}</Text>
            <Text style={styles.investYield}>Rendimento: {item.rendimento}</Text>
            <View style={styles.investRow}>
              <Text style={styles.investRisk}>Risco: {item.risco}</Text>
              <Text style={styles.investLiquidity}>Liquidez: {item.liquidez}</Text>
            </View>
            {item.variacao_percentual !== undefined && item.variacao_percentual !== null && (
              <Text style={[styles.investVariation, { 
                color: item.variacao_percentual >= 0 ? '#57FF5A' : '#FF5757' 
              }]}>
                {item.variacao_percentual >= 0 ? '▲' : '▼'} {Math.abs(item.variacao_percentual).toFixed(2)}%
              </Text>
            )}
            {item.fonte && (
              <Text style={styles.investSource}>Fonte: {item.fonte === 'brapi' ? 'Brapi' : 'Yahoo Finance'}</Text>
            )}
          </View>
        ))}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
