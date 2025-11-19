import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import stylesDefault, { makeStyles } from '../styles/EstiloLogin';
import Grafico from '../assets/Grafico2.png';
import seta from '../assets/seta.png';
import api from '../services/api';
import { useAppTheme } from '../context/ThemeContext';

export default function TelaRecuperarSenha({ navigation }) {
  const { colors, themeName } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [etapa, setEtapa] = useState(1); // 1: solicitar código, 2: redefinir senha
  const [emailErro, setEmailErro] = useState('');

  const handleSolicitarCodigo = async () => {
    setEmailErro('');
    
    if (!email.trim()) {
      setEmailErro('Digite seu e-mail');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailErro('Digite um e-mail válido');
      return;
    }

    setLoading(true);
    try {
      await api.post('/recuperar-senha/solicitar', {
        email: email.trim().toLowerCase(),
      });
      
      Alert.alert(
        'Código enviado!',
        'Um código de recuperação foi enviado para seu e-mail.',
        [{ text: 'OK', onPress: () => setEtapa(2) }]
      );
    } catch (error) {
      console.error('Erro ao solicitar código:', error);
      if (error.response?.data?.erro) {
        Alert.alert('Erro', error.response.data.erro);
      } else {
        Alert.alert('Erro', 'Não foi possível enviar o código. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRedefinirSenha = async () => {
    if (!codigo.trim()) {
      Alert.alert('Atenção', 'Digite o código recebido');
      return;
    }

    if (!novaSenha.trim()) {
      Alert.alert('Atenção', 'Digite a nova senha');
      return;
    }

    if (novaSenha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não coincidem');
      return;
    }

    setLoading(true);
    try {
      await api.post('/recuperar-senha/redefinir', {
        email: email.trim().toLowerCase(),
        codigo: codigo.trim(),
        nova_senha: novaSenha,
      });
      
      Alert.alert(
        'Sucesso!',
        'Sua senha foi redefinida com sucesso!',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      if (error.response?.data?.erro) {
        Alert.alert('Erro', error.response.data.erro);
      } else {
        Alert.alert('Erro', 'Não foi possível redefinir a senha. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === 'android' ? 120 : 60}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            backgroundColor: colors.background,
          }}
          showsVerticalScrollIndicator={false}
        >
          <StatusBar barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

          {/* Botão voltar */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: 'absolute', top: 40, left: 20 }}
          >
            <Image source={seta} style={{ width: 30, height: 30, tintColor: colors.text }} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Recuperar Senha</Text>
          </View>

          <Text style={styles.text}>
            {etapa === 1
              ? 'Digite seu e-mail para receber o código de recuperação'
              : 'Digite o código recebido e sua nova senha'}
          </Text>
          
          <Image source={Grafico} style={styles.image} />

          {etapa === 1 ? (
            <>
              <View style={{ width: '100%', marginBottom: 15 }}>
                {emailErro ? <Text style={styles.errorText}>{emailErro}</Text> : null}
                <TextInput
                  style={styles.inputEmail}
                  placeholder=" E-mail"
                  placeholderTextColor={colors.mutedText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>

              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.5 }]}
                onPress={handleSolicitarCodigo}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Enviar Código</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={{ width: '100%', marginBottom: 15 }}>
                <TextInput
                  style={styles.inputEmail}
                  placeholder=" Código de 6 dígitos"
                  placeholderTextColor={colors.mutedText}
                  value={codigo}
                  onChangeText={setCodigo}
                  keyboardType="number-pad"
                  maxLength={6}
                  editable={!loading}
                />
              </View>

              <View style={{ width: '100%', marginBottom: 15 }}>
                <TextInput
                  style={styles.inputSenha}
                  placeholder=" Nova Senha"
                  placeholderTextColor={colors.mutedText}
                  value={novaSenha}
                  onChangeText={setNovaSenha}
                  secureTextEntry
                  editable={!loading}
                />
              </View>

              <View style={{ width: '100%', marginBottom: 15 }}>
                <TextInput
                  style={styles.inputSenha}
                  placeholder=" Confirmar Nova Senha"
                  placeholderTextColor={colors.mutedText}
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                  secureTextEntry
                  editable={!loading}
                />
              </View>

              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.5 }]}
                onPress={handleRedefinirSenha}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Redefinir Senha</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setEtapa(1)} style={{ marginTop: 15 }}>
                <Text style={styles.linkText}>
                  Não recebeu o código? Reenviar
                </Text>
              </TouchableOpacity>
            </>
          )}
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
