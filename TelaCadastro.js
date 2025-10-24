import React, { useState, useRef } from 'react';
import {View,Text,TextInput,TouchableOpacity,StatusBar,Image,ScrollView,Platform,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard,
} from 'react-native';
import styles from './Estilos/EstiloCadastro';
import Grafico from './assets/Grafico.png';

const isWeb = Platform.OS === 'web';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const [nomeErro, setNomeErro] = useState('');
  const [emailErro, setEmailErro] = useState('');
  const [cpfErro, setCpfErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');

  const emailRef = useRef(null);
  const cpfRef = useRef(null);
  const senhaRef = useRef(null);

  const handleCadastro = () => {
    let hasError = false;

    if (!nome.trim()) {
      setNomeErro('Esse campo precisa ser preenchido!');
      hasError = true;
    } else {
      setNomeErro('');
    }

    if (!email.trim()) {
      setEmailErro('Esse campo precisa ser preenchido!');
      hasError = true;
    } else {
      setEmailErro('');
    }

    if (!cpf.trim()) {
      setCpfErro('Esse campo precisa ser preenchido!');
      hasError = true;
    } else {
      setCpfErro('');
    }

    if (!senha.trim()) {
      setSenhaErro('Esse campo precisa ser preenchido!');
      hasError = true;
    } else {
      setSenhaErro('');
    }

    if (!hasError) {
      console.log('Cadastro realizado com sucesso!');
      navigation.navigate('Usuario');
    }
  };

  const content = (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.header}>
        <Text style={styles.title}>Gefi</Text>
      </View>

      <Text style={styles.text}>
        Bem-Vindo ao começo de uma vida financeira saudável
      </Text>
      <Image source={Grafico} style={styles.image} />

      <View style={{ marginBottom: 15 }}>
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
        />
      </View>

      <View style={{ marginBottom: 15 }}>
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
        />
      </View>

      <View style={{ marginBottom: 15 }}>
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
        />
      </View>

      <View style={{ marginBottom: 15 }}>
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
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
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
