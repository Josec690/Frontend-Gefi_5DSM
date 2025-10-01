const styles = {
  container: {
    flex: 1,
    backgroundColor: '#000', 
  },

  navbar: {
    width: '100%',
    height: 140, 
    backgroundColor: '#006600', 
    flexDirection: 'column', 
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    marginTop: 50,
    paddingVertical: 10, 
  },

  profileIcon: {
    width: 60,  
    height: 60, 
    marginBottom: 10, 
    marginLeft: -5, 
  },

  userInfo: {
    marginLeft: 20, 
  },

  welcomeText: {
    fontSize: 15,
    color: '#fff', 
    marginLeft: -15, 
  },

  cpfText: {
    fontSize: 16,
    color: '#fff', 
    marginLeft: -15, 
  },

  balancoCard: {
    marginTop: 5, 
    marginLeft: 2,
    marginRight: 1,
    padding: 20,
    backgroundColor: 'rgba(129, 199, 132, 0.15)', 
    marginHorizontal: 20, 
    borderBottomRightRadius: 20, 
    borderColor: 'rgba(129, 199, 132, 0.1)', 
    borderWidth: 2, 
  },

  balancoCardTitle: {
    fontSize: 15,
    color: '#fff',
    marginTop: -5,
  },

  balancoValorText: {
    fontSize: 45, 
    color: '#fff', 
    fontWeight: 'bold', 
    marginTop: 10, 
  },

  proximasSaidasTitleContainer: {
    width: '100%', 
    alignItems: 'center',
    marginTop: 30, 
  },

  proximasSaidasTitle: {
    marginBottom: 20,
    marginTop: -5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center', 
  },

  proximasSaidasCard: {
    marginTop: 5, 
    marginLeft: 2,
    marginRight: 1,
    padding: 12,
    backgroundColor: 'rgba(129, 199, 132, 0.1)', 
    marginHorizontal: 20, 
    borderBottomRightRadius: 20, 
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6, 
    borderColor: 'rgba(129, 199, 132, 0.1)', 
    borderWidth: 2, 
  },

  horizontalCardsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%',
  },

  horizontalCardOne: {
    padding: 20,
    backgroundColor: 'rgba(129, 199, 132, 0.06)', 
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: 'rgba(129, 199, 132, 0.06)', 
    borderWidth: 2,
    width: '48%', 
    height: '100%', 
  },

  horizontalCardTwo: {
    padding: 20,
    backgroundColor: 'rgba(129, 199, 132, 0.06)',
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'rgba(129, 199, 132, 0.06)', 
    borderWidth: 2,
    width: '48%',
    height: '100%', 
  },

  ProximaSaidaValor: {
    fontSize: 15, 
    color: '#fff', 
    marginBottom: 10, 
    textAlign: 'center',
  },

  ProximaSaidaTitulo: {
    fontSize: 15,
    color: '#fff',
    marginBottom: -5, 
    textAlign: 'center',
  },

  iconImage1: {
    width: 25, 
    height: 25, 
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: -6,
  },

  iconImage2: {
    width: 25, 
    height: 25, 
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: -6,
  },

  tabBar: {
    position: 'absolute',
    bottom: 50,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: '#000', 
    borderRadius: 50,
    height: 70,
    borderTopWidth: 0,
    borderWidth: 2,
    borderColor: '#57FF5A',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    paddingBottom: 5,
    paddingTop: 5,
  },

  tabBarLabel: {
    fontSize: 12,
    color: '#81c784',
    marginBottom: 5,
  },
};

export default styles;
