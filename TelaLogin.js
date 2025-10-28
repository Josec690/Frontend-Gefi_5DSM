import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './Estilos/EstiloLogin';
import Grafico from './assets/Grafico2.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './services/api'; // Importa o serviço

const isWeb = Platform.OS === 'web';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const [emailErro, setEmailErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');

  const senhaRef = useRef(null);

  const handleLogin = async () => {
    // Limpar erros
    setEmailErro('');
    setSenhaErro('');

    let hasError = false;

    if (!email.trim()) {
      setEmailErro('Esse campo precisa ser preenchido!');
      hasError = true;
    }

    if (!senha.trim()) {
      setSenhaErro('Esse campo precisa ser preenchido!');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const response = await api.post('/login', {
        email: email.trim().toLowerCase(),
        senha: senha,
      });

      // Salvar token e dados do usuário
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.usuario));

      Alert.alert('Sucesso!', 'Login realizado com sucesso!');
      
      // Navegar para a tela principal
      navigation.navigate('Usuario');

    } catch (error) {
      console.error('Erro no login:', error);
      
      if (error.response) {
        Alert.alert('Erro', error.response.data.erro || 'Email ou senha incorretos');
      } else if (error.request) {
        Alert.alert('Erro', 'Não foi possível conectar ao servidor');
      } else {
        Alert.alert('Erro', 'Erro ao processar login');
      }
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <ScrollView
      style={{ backgroundColor: '#000' }}
      contentContainerStyle={{ flexGrow: 1, padding: 20, alignItems: 'center' }}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.header}>
        <Text style={styles.title}>Gefi</Text>
      </View>

      <Text style={styles.text}>Que bom te ver por aqui!</Text>
      <Image source={Grafico} style={styles.image} />

      <View style={{ width: '100%', marginBottom: 15 }}>
        {emailErro ? <Text style={styles.errorText}>{emailErro}</Text> : null}
        <TextInput
          style={styles.inputEmail}
          placeholder=" E-mail"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => senhaRef.current?.focus()}
          blurOnSubmit={false}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />
      </View>

      <View style={{ width: '100%', marginBottom: 15 }}>
        {senhaErro ? <Text style={styles.errorText}>{senhaErro}</Text> : null}
        <TextInput
          ref={senhaRef}
          style={styles.inputSenha}
          placeholder=" Senha"
          placeholderTextColor="#ccc"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleLogin}
          editable={!loading}
        />
      </View>

      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.5 }]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.linkText}>Ainda não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  if (isWeb) {
    return <View style={{ flex: 1, backgroundColor: '#000' }}>{content}</View>;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#000' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'android' ? 20 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{content}</TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}