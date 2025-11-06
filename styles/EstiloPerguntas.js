import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  title: {
  fontSize: 48,
  fontWeight: '900',
  color: '#fff', 
  textAlign: 'left',
  marginTop: 80,
  marginLeft: 40,
  fontFamily: 'System',
},
  questionContainer: {
    width: '80%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -100,
    textAlign: 'center',
    color: '#fff',
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    width: 290,
    backgroundColor: 'rgba(8, 156, 1, 0.2)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 20,
    borderColor: 'rgba(128, 199, 132, 0.4)',
    borderWidth: 1,
  },
  optionButtonSelected: {
    backgroundColor: 'rgba(8, 156, 1, 0.5)',
  },
  optionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  optionTextSelected: {
    fontWeight: 'bold',
    color: '#fff',
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 10,
    width: 350,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 4,
    marginBottom: 80,
    overflow: 'hidden',
    backgroundColor: '#rgba(0, 0, 0, 0)',
  },
  progressSegment: {
    flex: 1,
    backgroundColor: '#555', 
    marginHorizontal: 2,
    borderRadius: 4,
  },
  progressSegmentActive: {
    backgroundColor: '#57FF5A',
  },
});
