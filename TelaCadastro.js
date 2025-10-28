import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './Estilos/EstiloCadastro';
import Grafico from './assets/Grafico.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './services/api'; // Importa o serviço

const isWeb = Platform.OS === 'web';

export default function TelaCadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const [nomeErro, setNomeErro] = useState('');
  const [emailErro, setEmailErro] = useState('');
  const [cpfErro, setCpfErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');

  const emailRef = useRef(null);
  const cpfRef = useRef(null);
  const senhaRef = useRef(null);

  const handleCadastro = async () => {
    // Limpar erros anteriores
    setNomeErro('');
    setEmailErro('');
    setCpfErro('');
    setSenhaErro('');

    // Validações básicas
    let hasError = false;

    if (!nome.trim()) {
      setNomeErro('Esse campo precisa ser preenchido!');
      hasError = true;
    }

    if (!email.trim()) {
      setEmailErro('Esse campo precisa ser preenchido!');
      hasError = true;
    }

    if (!cpf.trim()) {
      setCpfErro('Esse campo precisa ser preenchido!');
      hasError = true;
    }

    if (!senha.trim()) {
      setSenhaErro('Esse campo precisa ser preenchido!');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      // Chamada para o backend
      const response = await api.post('/cadastro', {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        cpf: cpf.trim(),
        senha: senha,
      });

      // Salvar token e dados do usuário
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('usuario_id', response.data.usuario_id);

      Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');
      
      // Navegar para a próxima tela
      navigation.navigate('TelaPerguntas');

    } catch (error) {
      console.error('Erro no cadastro:', error);
      
      if (error.response) {
        // Erro do servidor
        Alert.alert('Erro', error.response.data.erro || 'Erro ao cadastrar');
      } else if (error.request) {
        // Sem resposta do servidor
        Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique sua conexão.');
      } else {
        // Outro erro
        Alert.alert('Erro', 'Erro ao processar cadastro');
      }
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 20, alignItems: 'center' }}
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.header}>
        <Text style={styles.title}>Gefi</Text>
      </View>

      <Text style={styles.text}>
        Bem-vindo ao começo de uma vida financeira saudável
      </Text>
      <Image source={Grafico} style={styles.image} />

      <View style={{ width: '100%', marginBottom: 15 }}>
        {nomeErro ? <Text style={styles.errorText}>{nomeErro}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder=" Nome"
          placeholderTextColor="#ccc"
          value={nome}
          onChangeText={setNome}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
          blurOnSubmit={false}
          editable={!loading}
        />
      </View>

      <View style={{ width: '100%', marginBottom: 15 }}>
        {emailErro ? <Text style={styles.errorText}>{emailErro}</Text> : null}
        <TextInput
          ref={emailRef}
          style={styles.input}
          placeholder=" E-mail"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => cpfRef.current?.focus()}
          blurOnSubmit={false}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
        />
      </View>

      <View style={{ width: '100%', marginBottom: 15 }}>
        {cpfErro ? <Text style={styles.errorText}>{cpfErro}</Text> : null}
        <TextInput
          ref={cpfRef}
          style={styles.input}
          placeholder=" CPF"
          placeholderTextColor="#ccc"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
          returnKeyType="next"
          onSubmitEditing={() => senhaRef.current?.focus()}
          blurOnSubmit={false}
          editable={!loading}
        />
      </View>

      <View style={{ width: '100%', marginBottom: 15 }}>
        {senhaErro ? <Text style={styles.errorText}>{senhaErro}</Text> : null}
        <TextInput
          ref={senhaRef}
          style={styles.input}
          placeholder=" Senha"
          placeholderTextColor="#ccc"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleCadastro}
          editable={!loading}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.5 }]}
        onPress={handleCadastro}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {content}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}