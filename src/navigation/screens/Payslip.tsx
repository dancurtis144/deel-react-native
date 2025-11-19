import { Text } from "@react-navigation/elements";
import { StaticScreenProps } from "@react-navigation/native";
import { Alert, Button, Image, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { File, Directory, Paths } from "expo-file-system";
import { useEffect, useState } from "react";
import PdfRendererView from "react-native-pdf-renderer";
import moment from "moment";

type Props = StaticScreenProps<{
  id: number;
  fromDate: string;
  toDate: string;
  file: string;
}>;

export function Payslip({ route }: Props) {
  const [file, setFile] = useState<string | undefined>(undefined);
  const [isPdf, setIsPdf] = useState(false);
  const [showFile, setShowFile] = useState(false);

  const isFileExists = async () => {
    const file = new File(Paths.document, route.params.file);
    const fileExists = await file.info().exists;
    return fileExists;
  };

  const onPressDownload = async () => {
    try {
      // Demo purposes only
      const fileUrl = `https://pdfobject.com/pdf/sample.pdf`;

      // Create a file reference in the document directory

      const file = new File(Paths.document, route.params.file);
      const fileExists = await isFileExists();
      if (!fileExists) {
        const downloadResult = await File.downloadFileAsync(fileUrl, file);
        Alert.alert(
          "Success",
          `File downloaded successfully!\n\nSaved to: ${downloadResult.uri}`,
          [{ text: "OK" }]
        );
        setFile(downloadResult.uri);
      } else {
        Alert.alert("Info", `File already exists at:\n\n${file.uri}`, [
          { text: "OK" },
        ]);
        setFile(file.uri);
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to download file. Please check the file URL."
      );
    }
  };

  useEffect(() => {
    setIsPdf(route.params.file.endsWith(".pdf"));
  }, [route.params.file]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route.params.id}</Text>
      <Text style={styles.text}>
        From: {moment(route.params.fromDate).format("MMMM Do, YYYY")}
      </Text>
      <Text style={styles.text}>
        To: {moment(route.params.toDate).format("MMMM Do, YYYY")}
      </Text>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Text style={styles.text}>File: {route.params.file}</Text>
        {route.params.file.endsWith(".pdf") ? (
          <Ionicons name="document-text-outline" size={20} color="black" />
        ) : (
          <Ionicons name="image-outline" size={20} color="black" />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Download" onPress={onPressDownload} />
        {!showFile && (
          <Button title="Preview" onPress={() => setShowFile(true)} />
        )}
        {showFile && (
          <Button title="Close Preview" onPress={() => setShowFile(false)} />
        )}
      </View>
      {showFile && isPdf && <PdfRendererView source={file} />}
      {showFile && !isPdf && (
        <Image
          source={{ uri: file }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    gap: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
