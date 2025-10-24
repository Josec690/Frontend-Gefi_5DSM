import React, { useState, useRef } from 'react';
import {View,Text,TextInput,TouchableOpacity,StatusBar,Image,KeyboardAvoidingView,ScrollView,Platform,Keyboard,TouchableWithoutFeedback } from 'react-native';
import styles from './Estilos/EstiloLogin';
import Grafico from './assets/Grafico2.png';

const isWeb = Platform.OS === 'web';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [emailErro, setEmailErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');

  const senhaRef = useRef(null);

  const handleLogin = () => {
    let hasError = false;

    if (!email.trim()) {
      setEmailErro('Esse campo precisa ser preenchido!');
      hasError = true;
    } else {
      setEmailErro('');
    }

    if (!senha.trim()) {
      setSenhaErro('Esse campo precisa ser preenchido!');
      hasError = true;
    } else {
      setSenhaErro('');
    }

    if (!hasError) {
      console.log('Login bem-sucedido!');
      navigation.navigate('Usuario');
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
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
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
