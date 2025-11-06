import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  // Seta de voltar
  botaoVoltar: {
    position: 'absolute',
    left: 16,
    top: 70,
  },
  iconeSeta: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },

  // Imagem do perfil
  imagemPerfil: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 168,
    top: 148,
    borderRadius: 125 / 2,
  },
nomeUsuario: {
  position: 'absolute',
  top: 200, 
  fontSize: 22,
  fontWeight: 'bold',
  color: '#fff',
  alignSelf: 'center', 
  textAlign: 'center',
},

emailUsuario: {
  position: 'absolute',
  top: 225,         
  fontSize: 16,
  color: '#fff',
  alignSelf: 'center', 
  textAlign: 'center',
},
  // Container dos botões
  containerBotoes: {
    marginTop: 300, // distancia do topo, ajustável
    gap: 20,        // espaçamento entre os botões
    alignItems: 'center',
  },

  // Botões principais
  botao: {
    width: 260,
    backgroundColor: 'rgba(8, 156, 1, 0.22)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 20,
    borderColor: 'rgba(128, 199, 132, 0.4)',
    borderWidth: 1,
  },

  // Botão de sair
  botaoSair: {
    width: 260,
    backgroundColor: 'rgba(229, 57, 53, 0.8)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 20,
    borderColor: 'rgba(229, 57, 53, 0.4)',
    borderWidth: 1,
  },

  // Texto dos botões
  textoBotao: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
