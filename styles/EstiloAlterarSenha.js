import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },

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
    marginBottom: 20,
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

  botaoConfirmar: {
    marginTop: 30,
    backgroundColor: 'rgba(8, 156, 1, 0.8)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    top: 80,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
