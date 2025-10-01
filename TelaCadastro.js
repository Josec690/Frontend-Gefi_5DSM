import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import styles from "./Estilos/EstiloCadastro";
import Grafico from "./assets/Grafico.png";

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const [nomeErro, setNomeErro] = useState("");
  const [emailErro, setEmailErro] = useState("");
  const [cpfErro, setCpfErro] = useState("");
  const [senhaErro, setSenhaErro] = useState("");

  const handleCadastro = () => {
    let hasError = false;

    if (!nome.trim()) {
      setNomeErro("Esse campo precisa ser preenchido!");
      hasError = true;
    } else {
      setNomeErro("");
    }

    if (!email.trim()) {
      setEmailErro("Esse campo precisa ser preenchido!");
      hasError = true;
    } else {
      setEmailErro("");
    }

    if (!cpf.trim()) {
      setCpfErro("Esse campo precisa ser preenchido!");
      hasError = true;
    } else {
      setCpfErro("");
    }

    if (!senha.trim()) {
      setSenhaErro("Esse campo precisa ser preenchido!");
      hasError = true;
    } else {
      setSenhaErro("");
    }

    if (!hasError) {
      console.log("Cadastro realizado com sucesso!");
      navigation.navigate("Usuario");
    }
  };

  return (
    <View style={styles.container}>
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
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        {emailErro ? <Text style={styles.errorText}>{emailErro}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder=" E-mail"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        {cpfErro ? <Text style={styles.errorText}>{cpfErro}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder=" CPF"
          placeholderTextColor="#ccc"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
      </View>

      <View style={{ marginBottom: 15 }}>
        {senhaErro ? <Text style={styles.errorText}>{senhaErro}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder=" Senha"
          placeholderTextColor="#ccc"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
