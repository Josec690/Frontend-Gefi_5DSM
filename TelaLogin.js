import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image } from 'react-native';
import styles from './Estilos/EstiloLogin'; 
import Grafico from './assets/Grafico2.png'; 

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [emailErro, setEmailErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.header}>
        <Text style={styles.title}>Gefi</Text>
      </View>

      <Text style={styles.text}>Que bom te ver por aqui!</Text>
      <Image source={Grafico} style={styles.image} />

      {emailErro ? <Text style={styles.errorText}>{emailErro}</Text> : null}
      <TextInput
        style={styles.inputEmail}
        placeholder=" E-mail"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {senhaErro ? <Text style={styles.errorText}>{senhaErro}</Text> : null}
      <TextInput
        style={styles.inputSenha}
        placeholder=" Senha"
        placeholderTextColor="#ccc"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.linkText}>Ainda não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
