import { Text } from '@react-navigation/elements';
import { StaticScreenProps } from '@react-navigation/native';
import {Button, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Directory, File, Paths } from 'expo-file-system';

type Props = StaticScreenProps<{
  id: number;
  fromDate: string;
  toDate: string;
  file: string;
}>;

export function Payslip({ route }: Props) {

    const onPressDownload = async() => {
      const destination = new Directory(Paths.cache, route.params.file);
      try {
        destination.create();
        const output = await File.downloadFileAsync(route.params.file, destination);
        console.log(output.exists); // true
        console.log(output.uri); // path to the downloaded file, e.g., '${cacheDirectory}/pdfs/sample.pdf'
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.id}</Text>
      <Text style={styles.text}>From: {route.params.fromDate}</Text>
      <Text style={styles.text}>To: {route.params.toDate}</Text>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Text style={styles.text}>File: {route.params.file}</Text>
        {route.params.file.endsWith('.pdf') ? (
          <Ionicons name="document-text-outline" size={20} color="black" />
        ) : (
          <Ionicons name="image-outline" size={20} color="black" />
        )}
      </View>
      <Button title="Download" onPress={onPressDownload} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
  }
});
