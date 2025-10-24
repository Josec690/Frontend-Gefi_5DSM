import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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

export default function App() {
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      flatListRef.current.scrollToIndex({ index: nextIndex });
      setCurrentIndex(nextIndex);
    } else {
      console.log('Respostas completas:', { ...answers, [questionId]: answer });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.questionContainer}>
      <Text style={styles.questionText}>{item.text}</Text>
      <View style={styles.optionsContainer}>
        {item.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.optionButton}
            onPress={() => handleAnswer(item.id, option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={questions}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      scrollEnabled={false} 
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  questionContainer: {
    width,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#2e86de',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
  },
});
