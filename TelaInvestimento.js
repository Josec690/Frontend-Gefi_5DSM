import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./Estilos/EstiloInvestimento";

const investimentos = [
  { id: "1", nome: "Ações - Empresa A", rendimento: "8% ao ano" },
  { id: "2", nome: "Fundo Imobiliário", rendimento: "6% ao ano" },
  { id: "3", nome: "Tesouro Direto", rendimento: "5% ao ano" },
  { id: "4", nome: "CDB Banco X", rendimento: "7% ao ano" },
];

export default function InvestScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Lista de Investimentos</Text>
      </View>

      <FlatList
        data={investimentos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.investItem}>
            <Text style={styles.investName}>{item.nome}</Text>
            <Text style={styles.investYield}>{item.rendimento}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}
