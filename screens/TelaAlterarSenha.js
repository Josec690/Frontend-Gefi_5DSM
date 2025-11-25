import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import stylesDefault, { makeStyles } from '../styles/EstiloAlterarSenha';
import seta from '../assets/seta.png';
import api from '../services/api';
import { useAppTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function TelaAlterarSenha() {
  const navigation = useNavigation();
  const { colors, themeName } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmaSenha, setShowConfirmaSenha] = useState(false);

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
      const response = await api.put('/mudar-senha', {
        senha_atual: senhaAtual,
        senha_nova: novaSenha
      });
      Alert.alert('Sucesso', response.data.mensagem || 'Senha alterada com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao alterar a senha:', error);
      // Tentar mostrar mensagem do servidor quando disponível
      const serverMsg = error.response?.data?.erro || error.response?.data?.message;
      if (serverMsg) {
        Alert.alert('Erro', serverMsg);
      } else {
        Alert.alert('Erro', 'Não foi possível alterar a senha.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

      {/* Seta de voltar */}
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Image source={seta} style={styles.iconeSeta} />
      </TouchableOpacity>

      {/* Senha atual */}
      <View style={styles.campoContainer}>
        <Text style={styles.label}>Senha Atual</Text>
        <View style={{ position: 'relative' }}>
          <TextInput
            style={[styles.input, { paddingRight: 45 }]}
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            secureTextEntry={!showSenhaAtual}
            placeholder="Digite a senha atual"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
          <TouchableOpacity
            onPress={() => setShowSenhaAtual(!showSenhaAtual)}
            style={{
              position: 'absolute',
              right: 15,
              top: '50%',
              transform: [{ translateY: -15 }],
              padding: 5,
            }}
          >
            <Ionicons
              name={showSenhaAtual ? "eye-off-outline" : "eye-outline"}
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Nova senha */}
      <View style={styles.campoContainer}>
        <Text style={styles.label}>Nova Senha</Text>
        <View style={{ position: 'relative' }}>
          <TextInput
            style={[styles.input, { paddingRight: 45 }]}
            value={novaSenha}
            onChangeText={setNovaSenha}
            secureTextEntry={!showNovaSenha}
            placeholder="Digite a nova senha"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
          <TouchableOpacity
            onPress={() => setShowNovaSenha(!showNovaSenha)}
            style={{
              position: 'absolute',
              right: 15,
              top: '50%',
              transform: [{ translateY: -15 }],
              padding: 5,
            }}
          >
            <Ionicons
              name={showNovaSenha ? "eye-off-outline" : "eye-outline"}
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirmar nova senha */}
      <View style={styles.campoContainer}>
        <Text style={styles.label}>Confirmar Nova Senha</Text>
        <View style={{ position: 'relative' }}>
          <TextInput
            style={[styles.input, { paddingRight: 45 }]}
            value={confirmaSenha}
            onChangeText={setConfirmaSenha}
            secureTextEntry={!showConfirmaSenha}
            placeholder="Confirme a nova senha"
            placeholderTextColor="rgba(255,255,255,0.5)"
          />
          <TouchableOpacity
            onPress={() => setShowConfirmaSenha(!showConfirmaSenha)}
            style={{
              position: 'absolute',
              right: 15,
              top: '50%',
              transform: [{ translateY: -15 }],
              padding: 5,
            }}
          >
            <Ionicons
              name={showConfirmaSenha ? "eye-off-outline" : "eye-outline"}
              size={22}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão Confirmar */}
      <TouchableOpacity style={styles.botaoConfirmar} onPress={handleConfirmar}>
        <Text style={styles.textoBotao}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}
