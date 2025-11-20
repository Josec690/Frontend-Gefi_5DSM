import React, { useRef, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, useWindowDimensions, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import api from '../services/api';
import stylesDefault, { makeStyles } from '../styles/EstiloPerguntas';
import { useAppTheme } from '../context/ThemeContext';

const questions = [
  {
    id: 'q1',
    text: 'É a sua primeira vez investindo?',
    options: ['Sim', 'Não'],
  },
  {
    id: 'q2',
    text: 'Qual seu objetivo principal ao investir?',
    options: ['Aposentadoria', 'Comprar um imóvel', 'Ganhos rápidos'],
  },
  {
    id: 'q3',
    text: 'Qual seu nível de conhecimento sobre investimentos?',
    options: ['Iniciante', 'Intermediário', 'Avançado'],
  },
];

export default function TelaPerguntas({ navigation }) {
  const { colors, themeName } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);
  const { width, height } = useWindowDimensions();

  const salvarRespostas = async (respostas) => {
    setLoading(true);
    try {
      await api.post('/questionario', {
        respostas: respostas
      });
      console.log('✅ Questionário salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar questionário:', error);
      Alert.alert('Aviso', 'Não foi possível salvar o questionário, mas você pode continuar usando o app.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (questionId, answer) => {
    const updatedAnswers = { ...answers, [questionId]: answer };
    setAnswers(updatedAnswers);

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }

    // Se respondeu todas as perguntas
    if (Object.keys(updatedAnswers).length === questions.length) {
      // Salvar no backend
      await salvarRespostas(updatedAnswers);
      
      setShowWelcome(true);
      setTimeout(() => {
        navigation.navigate('Usuario'); 
      }, 2000);
    }
  };

  const onMomentumScrollEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setCurrentIndex(newIndex);
  };

  const renderItem = ({ item }) => {
    const selectedAnswer = answers[item.id];

    return (
      <View style={[styles.questionContainer, { width, height: height - 150 }]}>
        <Text style={styles.questionText}>{item.text}</Text>
        <View style={styles.optionsContainer}>
          {item.options.map((option) => {
            const isSelected = selectedAnswer === option;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                onPress={() => handleAnswer(item.id, option)}
                disabled={loading}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const getItemLayout = (_, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Text style={styles.title}>GeFi</Text>

      <FlatList
        ref={flatListRef}
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        extraData={answers}
        getItemLayout={getItemLayout}
        initialScrollIndex={currentIndex}
        scrollEnabled={true} 
      />

      <View style={styles.progressBarContainer}>
        {questions.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressSegment,
              currentIndex === index && styles.progressSegmentActive,
            ]}
          />
        ))}
      </View>

      {loading && (
        <View style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}>
          <ActivityIndicator size="large" color="#57FF5A" />
          <Text style={{ color: colors.text, marginTop: 10 }}>Salvando...</Text>
        </View>
      )}

      {showWelcome && (
        <View style={StyleSheet.absoluteFill}>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }]}>
            <Animatable.Text
              animation="fadeInDown"
              duration={1000}
              style={{ fontSize: 32, fontWeight: 'bold', color: colors.text }}
            >
              Bem-vindo!
            </Animatable.Text>
          </View>
        </View>
      )}
    </View>
  );
}
