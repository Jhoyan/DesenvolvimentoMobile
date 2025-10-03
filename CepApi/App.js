import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SafeAreaViewComponent from './components/SafeAreaViewComponent';

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaViewComponent></SafeAreaViewComponent>
      <StatusBar style="auto" />
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
