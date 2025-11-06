import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
  container: {
    flex: 1,               // ocupar toda altura da tela
    width: '100%',
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 30,
    marginLeft: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 25,
    alignSelf: 'center',
    width: 250,
  },
  input: {
    width: 350,
    alignSelf: 'center',
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: 260,
    backgroundColor: 'rgba(8, 156, 1, 0.2)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 20,
    borderColor: 'rgba(128, 199, 132, 0.4)',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 0,
  },
  image: {
    width: 300,
    height: 250,
    marginBottom: 20,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',  
    alignItems: 'center',        // centraliza verticalmente
    marginBottom: 25,
    gap: 10,
  },
  errorText: {
    color: 'rgba(255, 138, 138, 0.5)',
    marginTop: -22,
    marginBottom: 5,
    marginLeft: 14,
    fontSize: 12,
  },
});

export default styles;
