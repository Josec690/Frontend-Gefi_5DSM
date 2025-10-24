import React, { useState } from 'react';
import {View,Text,StatusBar,TouchableOpacity,Modal,Pressable,
} from 'react-native';
import styles from './Estilos/EstiloFinancas';

export default function TelaFinancas() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAtualizar = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2ecc71" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Controle Financeiro</Text>
      </View>

      <Text style={styles.subText}>
        Aqui você pode controlar suas finanças de forma simples e eficiente.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleAtualizar}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Atualizar</Text>
            <Text style={styles.modalSubtitle}>O que deseja atualizar hoje?</Text>

            <TouchableOpacity style={styles.modalButton} onPress={() => { /* lógica Entradas */ }}>
              <Text style={styles.modalButtonText}>Entradas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={() => { /* lógica Saídas */ }}>
              <Text style={styles.modalButtonText}>Saídas</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
