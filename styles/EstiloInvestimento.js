import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    paddingBottom: 100,
  },

  titleContainer: {
    backgroundColor: 'rgba(8,156,8, 0.08)',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(129, 199, 132, 0.3)',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#81c784',
  },

  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#57FF5A',
    marginBottom: 12,
  },

  investItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(129, 199, 132, 0.3)',
    marginBottom: 12,
  },

  investHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },

  investName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
  },

  investType: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
  },

  investYield: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },

  investRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  investRisk: {
    fontSize: 13,
    color: '#888',
  },

  investLiquidity: {
    fontSize: 13,
    color: '#888',
  },

  investPrice: {
    fontSize: 16,
    color: '#57FF5A',
    fontWeight: 'bold',
  },

  investVariation: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
  },

  investSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },

  investUnavailable: {
    fontSize: 12,
    color: '#FFA500',
    fontStyle: 'italic',
  },

  investSource: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },

  separator: {
    height: 12,
  },
});

export default styles;
