import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../services/api';
import styles from '../styles/EstiloFinancas';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function TelaFinancas() {
  const [modalVisible, setModalVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [tipoTransacao, setTipoTransacao] = useState('');
  const scrollRef = useRef(null);

  // Modal Bottom Sheet para atualizar
  const [modalAtualizarVisible, setModalAtualizarVisible] = useState(false);

  // Dados do formulário
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [ehRecorrente, setEhRecorrente] = useState(false);
  const [dataRecorrencia, setDataRecorrencia] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);

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

  useEffect(() => {
    const s = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const h = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
      // quando teclado fechar, resetar scroll do modal para posição inicial
      if (scrollRef.current && typeof scrollRef.current.scrollToPosition === 'function') {
        scrollRef.current.scrollToPosition(0, 0, true);
      }
    });
    return () => { s.remove(); h.remove(); };
  }, []);

  const handleAbrirModal = (tipo) => {
    setTipoTransacao(tipo);
    setModalVisible(true);
    setDescricao('');
    setValor('');
    setCategoria('');
    setEhRecorrente(false);
    setDataRecorrencia(new Date());
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

      if (ehRecorrente) {
        const dataISO = dataRecorrencia.toISOString();
        dados.data_primeira_recorrencia = dataISO;
        dados.data = dataISO; 
      }

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
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setModalAtualizarVisible(false)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
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
        </View>
      </Modal>

      {/* MODAL: Cadastro Entrada/Saída */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={handleCloseModal}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
      <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'android' ? 110 : 70}
      style={[styles.modalContent, { maxHeight: '100%' }]}
    >
      {/* ref para permitir scroll programático, e aumento do extraScrollHeight para evitar campos cobrirem */}
      <KeyboardAwareScrollView
        ref={scrollRef}
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === 'android' ? 200 : 120}
        keyboardOpeningTime={0}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? 240 : 140 }}
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

        {/* Checkbox e DatePicker */}
        {tipoTransacao === 'saida' && (
          <>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setEhRecorrente(!ehRecorrente)}
            >
              <View
                style={[styles.checkbox, ehRecorrente && styles.checkboxMarcado]}
              />
              <Text style={styles.checkboxTexto}>É uma despesa recorrente?</Text>
            </TouchableOpacity>

            {ehRecorrente && (
              <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity
                  style={[styles.input, { justifyContent: 'center' }]}
                  onPress={() => setMostrarDatePicker(true)}
                >
                  <Text style={{ color: '#fff' }}>
                    📅 {dataRecorrencia.toLocaleDateString('pt-BR')}
                  </Text>
                </TouchableOpacity>

                {mostrarDatePicker && (
                  <View style={{ width: '100%' }}>
                    <DateTimePicker
                      value={dataRecorrencia}
                      mode="date"
                      display="default"
                      minimumDate={new Date()} // 🔒 impede datas passadas
                      onChange={(event, selectedDate) => {
                        setMostrarDatePicker(false);
                        if (selectedDate) setDataRecorrencia(selectedDate);
                      }}
                    />
                  </View>
                )}
              </View>
            )}
          </>
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
      </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </View>
  </Modal>

    </View>
  );
}
