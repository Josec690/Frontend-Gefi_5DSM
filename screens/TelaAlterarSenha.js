import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/EstiloAlterarSenha';
import seta from '../assets/seta.png';
import api from '../services/api';

export default function TelaAlterarSenha() {
  const navigation = useNavigation();
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  const handleConfirmar = async () => {
    if (!senhaAtual || !novaSenha || !confirmaSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (novaSenha !== confirmaSenha) {
      Alert.alert('Erro', 'A nova senha e a confirmação não coincidem.');
      return;
    }

    try {
      // Chamada à API para alterar a senha
      await api.put('/usuario/senha', {
        senhaAtual,
        novaSenha
      });

      Alert.alert('Sucesso', 'Senha alterada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao alterar a senha:', error);
      Alert.alert('Erro', 'Não foi possível alterar a senha.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Seta de voltar */}
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Image source={seta} style={styles.iconeSeta} />
      </TouchableOpacity>

      {/* Senha atual */}
      <View style={styles.campoContainer}>
        <Text style={styles.label}>Senha Atual</Text>
        <TextInput
          style={styles.input}
          value={senhaAtual}
          onChangeText={setSenhaAtual}
          secureTextEntry
          placeholder="Digite a senha atual"
          placeholderTextColor="rgba(255,255,255,0.5)"
        />
      </View>

      {/* Nova senha */}
      <View style={styles.campoContainer}>
        <Text style={styles.label}>Nova Senha</Text>
        <TextInput
          style={styles.input}
          value={novaSenha}
          onChangeText={setNovaSenha}
          secureTextEntry
          placeholder="Digite a nova senha"
          placeholderTextColor="rgba(255,255,255,0.5)"
        />
      </View>

      {/* Confirmar nova senha */}
      <View style={styles.campoContainer}>
        <Text style={styles.label}>Confirmar Nova Senha</Text>
        <TextInput
          style={styles.input}
          value={confirmaSenha}
          onChangeText={setConfirmaSenha}
          secureTextEntry
          placeholder="Confirme a nova senha"
          placeholderTextColor="rgba(255,255,255,0.5)"
        />
      </View>

      {/* Botão Confirmar */}
      <TouchableOpacity style={styles.botaoConfirmar} onPress={handleConfirmar}>
        <Text style={styles.textoBotao}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}
