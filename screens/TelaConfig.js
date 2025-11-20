import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesDefault, { makeStyles } from '../styles/EstiloConfig';
import api from '../services/api';
import seta from '../assets/seta.png'; // seta de voltar
import { useAppTheme } from '../context/ThemeContext';

export default function TelaConfig() {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [usuario, setUsuario] = useState({ nome: '', email: '', cpf: '', senha: '' });
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const carregarUsuario = async () => {
        try {
          const response = await api.get('/usuario');
          setUsuario(response.data);
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
        } finally {
          setLoading(false);
        }
      };

      carregarUsuario();
    }, [])
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#fff' }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Seta de voltar */}
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Image source={seta} style={styles.iconeSeta} />
      </TouchableOpacity>

      {/* Nome */}
      <View style={styles.campoContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={usuario.nome} editable={false} />
      </View>

      {/* Email */}
      <View style={styles.campoContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={usuario.email} editable={false} />
      </View>

      {/* CPF */}
      <View style={styles.campoContainer}>
        <Text style={styles.label}>CPF</Text>
        <TextInput style={styles.input} value={usuario.cpf} editable={false} />
      </View>

      {/* Senha */}
      <View style={styles.campoContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} value={'********'} editable={false} secureTextEntry />
        {/* Editar senha */}
        <TouchableOpacity
          style={styles.botaoEditarSenha}
          onPress={() => navigation.navigate('AlterarSenha')}
          accessibilityLabel="Editar senha"
        >
          <FontAwesome name="pencil" size={16} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Controle de tema removido conforme solicitado */}
    </View>
  );
}
