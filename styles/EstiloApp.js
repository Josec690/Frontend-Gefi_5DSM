import { StyleSheet } from 'react-native';

// Estilos padrão (dark) mantidos para compatibilidade
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 25,
    fontSize: 16,
  },
  button: {
    width: 260,
    backgroundColor: '#rgba(8, 156, 1, 0.2)',
    padding: 15,
    borderRadius: 12,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 20,
    borderColor: '#rgba(128, 199, 132, 0.4)',
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'right',
    marginBottom: 25,
    gap: 10,
  },
});

// Gerador de estilos por tema
export function makeAppStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 30,
      color: colors.text,
      textAlign: 'left',
      marginBottom: 30,
      marginLeft: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    text: {
      fontSize: 18,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 25,
      alignSelf: 'center',
      width: 250,
    },
    input: {
      width: 350,
      alignSelf: 'center',
      backgroundColor: colors.inputBg,
      color: colors.inputText,
      borderRadius: 5,
      padding: 10,
      marginBottom: 25,
      fontSize: 16,
    },
    button: {
      width: 260,
      backgroundColor: '#rgba(8, 156, 1, 0.2)',
      padding: 15,
      borderRadius: 12,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 20,
      borderColor: '#rgba(128, 199, 132, 0.4)',
      borderWidth: 1,
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: colors.text,
      fontSize: 18,
      fontWeight: 'bold',
    },
    image: {
      width: 300,
      height: 300,
      marginBottom: 20,
      alignSelf: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'right',
      marginBottom: 25,
      gap: 10,
    },
  });
}

export default styles;