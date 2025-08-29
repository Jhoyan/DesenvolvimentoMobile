import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Soma from './components/Soma';

export default function App() {
  return (
    <View style={styles.container}>      
      <StatusBar style="auto" />
      <Soma></Soma>
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
