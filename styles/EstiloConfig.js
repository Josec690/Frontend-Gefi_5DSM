import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    width: 36,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(129, 199, 132, 0.3)',
  },
});

export function makeStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      tintColor: colors.text,
    },
    campoContainer: {
      marginBottom: 30,
      position: 'relative',
      top: 80,
    },
    label: {
      color: colors.text,
      fontSize: 16,
      marginBottom: 5,
      fontWeight: colors.background === '#F7F9FC' ? '700' : '500',
      letterSpacing: colors.background === '#F7F9FC' ? 0.3 : 0.1,
    },
    input: {
      backgroundColor: colors.inputBg,
      color: colors.inputText,
      fontSize: 16,
      padding: 10,
      borderRadius: 8,
      borderColor: colors.border,
      borderWidth: colors.background === '#F7F9FC' ? 2 : 1,
    },
    botaoEditarSenha: {
      position: 'absolute',
      right: 3,
      top: 75,
      width: 36,
      height: 32,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      borderWidth: colors.background === '#F7F9FC' ? 2 : 1,
      borderColor: colors.border,
    },
  });
}

export default styles;
