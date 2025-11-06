import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';
import styles from '../styles/EstiloFinancas';

export default function TelaFinancas() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoTransacao, setTipoTransacao] = useState('');

  // Modal Bottom Sheet para atualizar
  const [modalAtualizarVisible, setModalAtualizarVisible] = useState(false);

  // Dados do formulário
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [ehRecorrente, setEhRecorrente] = useState(false);

  // Listas
  const [entradas, setEntradas] = useState([]);
  const [saidas, setSaidas] = useState([]);
  const [loading, setLoading] = useState(false);

  const carregarTransacoes = async () => {
    try {
      const [responseEntradas, responseSaidas] = await Promise.all([
        api.get('/entradas'),
        api.get('/saidas'),
      ]);
      setEntradas(responseEntradas.data);
      setSaidas(responseSaidas.data);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarTransacoes();
    }, [])
  );

  const handleAbrirModal = (tipo) => {
    setTipoTransacao(tipo);
    setModalVisible(true);
    setDescricao('');
    setValor('');
    setCategoria('');
    setEhRecorrente(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setTipoTransacao('');
  };

  const handleSalvar = async () => {
    if (!descricao.trim() || !valor.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    const valorNumerico = parseFloat(valor.replace(',', '.'));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'Valor inválido');
      return;
    }

    setLoading(true);

    try {
      const dados = {
        descricao: descricao.trim(),
        valor: valorNumerico,
        categoria: categoria.trim() || 'Outros',
        data: new Date().toISOString(),
      };

      if (tipoTransacao === 'saida') {
        dados.eh_recorrente = ehRecorrente;
        await api.post('/saida', dados);
        Alert.alert('Sucesso', 'Saída cadastrada com sucesso!');
      } else {
        await api.post('/entrada', dados);
        Alert.alert('Sucesso', 'Entrada cadastrada com sucesso!');
      }

      handleCloseModal();
      carregarTransacoes();
    } catch (error) {
      console.error('Erro ao salvar:', error);
      Alert.alert('Erro', error.response?.data?.erro || 'Erro ao salvar transação');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletar = async (id, tipo) => {
    Alert.alert(
      'Confirmar',
      `Deseja realmente deletar esta ${tipo}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              if (tipo === 'entrada') {
                await api.delete(`/entrada/${id}`);
              } else {
                await api.delete(`/saida/${id}`);
              }
              Alert.alert('Sucesso', `${tipo.charAt(0).toUpperCase() + tipo.slice(1)} deletada!`);
              carregarTransacoes();
            } catch (error) {
              console.error('Erro ao deletar:', error);
              Alert.alert('Erro', 'Não foi possível deletar');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item, tipo }) => (
    <View style={styles.transacaoItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.transacaoDescricao}>{item.descricao}</Text>
        <Text style={styles.transacaoCategoria}>{item.categoria}</Text>
        <Text style={styles.transacaoData}>
          {new Date(item.data).toLocaleDateString('pt-BR')}
        </Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text
          style={[
            styles.transacaoValor,
            tipo === 'entrada' ? styles.valorPositivo : styles.valorNegativo,
          ]}
        >
          {tipo === 'entrada' ? '+' : '-'} R$ {item.valor.toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={() => handleDeletar(item.id, tipo)}
          style={styles.botaoDeletar}
        >
          <Text style={styles.textoDeletar}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2ecc71" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Controle Financeiro</Text>
      </View>

      <Text style={styles.subText}>
        Aqui você pode controlar suas finanças de forma simples e eficiente.
      </Text>

      {/* 📊 Listagem de transações direto na tela */}
      <ScrollView style={{ flex: 1, marginBottom: 90 }}>
        <Text style={styles.secaoTitulo}>Entradas</Text>
        {entradas.length > 0 ? (
          entradas.map((item) => (
            <View key={item.id}>{renderItem({ item, tipo: 'entrada' })}</View>
          ))
        ) : (
          <Text style={styles.textoVazio}>Nenhuma entrada cadastrada</Text>
        )}

        <Text style={[styles.secaoTitulo, { marginTop: 20 }]}>Saídas</Text>
        {saidas.length > 0 ? (
          saidas.map((item) => (
            <View key={item.id}>{renderItem({ item, tipo: 'saida' })}</View>
          ))
        ) : (
          <Text style={styles.textoVazio}>Nenhuma saída cadastrada</Text>
        )}
      </ScrollView>

      {/* 🟢 Botão flutuante Atualizar */}
      <TouchableOpacity
        style={styles.botaoFlutuante}
        onPress={() => setModalAtualizarVisible(true)}
      >
        <Text style={styles.botaoFlutuanteTexto}>Atualizar</Text>
      </TouchableOpacity>

      {/* MODAL: Bottom Sheet Atualizar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAtualizarVisible}
        onRequestClose={() => setModalAtualizarVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalAtualizarVisible(false)}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[
              styles.modalContent,
              { alignItems: 'center', justifyContent: 'center', gap: 20 },
            ]}
          >
            <Text style={styles.modalTitle}>O que deseja atualizar?</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalAtualizarVisible(false);
                handleAbrirModal('entrada');
              }}
            >
              <Text style={styles.buttonText}>+ Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalAtualizarVisible(false);
                handleAbrirModal('saida');
              }}
            >
              <Text style={styles.buttonText}>- Saída</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButtonCancelar}
              onPress={() => setModalAtualizarVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>

      {/* MODAL: Cadastro Entrada/Saída */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContent}
          >
            <Text style={styles.modalTitle}>
              {tipoTransacao === 'entrada' ? 'Nova Entrada' : 'Nova Saída'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Descrição"
              placeholderTextColor="#999"
              value={descricao}
              onChangeText={setDescricao}
            />

            <TextInput
              style={styles.input}
              placeholder="Valor (ex: 100.00)"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={valor}
              onChangeText={setValor}
            />

            <TextInput
              style={styles.input}
              placeholder="Categoria (opcional)"
              placeholderTextColor="#999"
              value={categoria}
              onChangeText={setCategoria}
            />

            {tipoTransacao === 'saida' && (
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setEhRecorrente(!ehRecorrente)}
              >
                <View
                  style={[styles.checkbox, ehRecorrente && styles.checkboxMarcado]}
                />
                <Text style={styles.checkboxTexto}>É uma despesa recorrente?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.modalButton, loading && { opacity: 0.5 }]}
              onPress={handleSalvar}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.modalButtonText}>Salvar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButtonCancelar}
              onPress={handleCloseModal}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
    </View>
  );
}
