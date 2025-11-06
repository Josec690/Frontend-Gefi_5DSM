import { StyleSheet } from 'react-native';

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
  marginTop: 20,     
  fontWeight: 'bold', 
},

  text: {
  fontSize: 18,
  color: '#fff',
  textAlign: 'center',
  marginTop: 25,
  marginBottom: 45,
  alignSelf: 'center',
  width: 250,

},
  inputEmail: {
  width: 350,
  alignSelf: 'center', 
  backgroundColor: '#1a1a1a',
  color: '#fff',
  borderRadius: 5,
  padding: 10,
  marginBottom: 25,
  fontSize: 16,
},
  inputSenha: {
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
    alignItems: 'center',
    alignSelf: 'center', 
    marginTop: 10,
    borderBottomRightRadius: 20, 
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 20, 
    borderColor: '#rgba(128, 199, 132, 0.4)',
    borderWidth: 1,
},
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
},
  image: {
  width: 300,
  height: 250,
  marginBottom: 40,
  marginTop: -30,
  alignSelf: 'center',
},
header: {
  flexDirection: 'row',
  alignItems: 'right',
  marginBottom: 25,
  gap: 10,
},
errorText: {
  color: 'rgba(255, 138, 138, 0.5)', 
  marginTop: -20,
  marginBottom: 5,
  marginLeft: 15,
  fontSize: 12,
},
});

export default styles;