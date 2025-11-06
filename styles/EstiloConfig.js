import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    
  },

  // Seta de voltar
  botaoVoltar: {
    position: 'absolute',
    left: 16,
    top: 40,
  },
  iconeSeta: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },

  campoContainer: {
    marginBottom: 30,
    position: 'relative',
    top: 80
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: 16,
    padding: 10,
    borderRadius: 8,
  },
  botaoEditarSenha: {
    position: 'absolute',
    right: 3,
    top: 75,
    width: 30,
    height: 30,
  },
  iconeEditar: {
    width: 30,
    height: 30,
  },
});
