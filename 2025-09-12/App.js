import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import InformPessoais from './components/InformPessoais';
import { globalStyles } from './styles/globalStyles';

export default function App() {
  return (
    <View style={styles.container}>      
      <InformPessoais></InformPessoais>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
