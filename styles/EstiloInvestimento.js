import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
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

  investItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(129, 199, 132, 0.3)',
  },

  investName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },

  investYield: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },

  separator: {
    height: 12,
  },
});

export default styles;
