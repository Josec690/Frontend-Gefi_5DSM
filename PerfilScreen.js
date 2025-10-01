import React from "react";
import { View, Text, StatusBar, Image } from "react-native";
import styles from "./Estilos/EstiloPerfil";

import perfilIcon from "./assets/Perfil.png";
import iconeSaidaGota from "./assets/Gota.png";
import iconeSaidaRaio from "./assets/Raio.png";

export default function PerfilScreen() {
  const nome = "Fulano";
  const cpf = "12********-00";
  const balancoMensal = 5000;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <View style={styles.navbar}>
        <Image source={perfilIcon} style={styles.profileIcon} />
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>Bem-vindo, {nome}</Text>
          <Text style={styles.cpfText}>{cpf}</Text>
        </View>
      </View>

      <View style={styles.balancoCard}>
        <Text style={styles.balancoCardTitle}>Balanço Mensal</Text>
        <Text style={styles.balancoValorText}>R$ {balancoMensal}</Text>
      </View>

      <View style={styles.proximasSaidasTitleContainer}>
        <Text style={styles.proximasSaidasTitle}>Próximas Saídas</Text>
      </View>

      <View style={styles.proximasSaidasCard}>
        <View style={styles.horizontalCardsContainer}>
          <View style={styles.horizontalCardOne}>
            <Image source={iconeSaidaGota} style={styles.iconImage1} />
            <Text style={styles.ProximaSaidaValor}>R$ 150</Text>
            <Text style={styles.ProximaSaidaTitulo}>Água (Contas)</Text>
          </View>
          <View style={styles.horizontalCardTwo}>
            <Image source={iconeSaidaRaio} style={styles.iconImage2} />
            <Text style={styles.ProximaSaidaValor}>R$ 200</Text>
            <Text style={styles.ProximaSaidaTitulo}>Energia (Contas)</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
