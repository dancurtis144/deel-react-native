import { Text } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { memo, useCallback, useContext } from "react";
import moment from "moment";
import { AppContext } from "../../context/AppContext";
import { PayslipItem } from "../../types/PayslipTypes";

const PayslipCard = memo(
  ({
    item,
    onPress,
  }: {
    item: PayslipItem;
    onPress: (item: PayslipItem) => void;
  }) => (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>
          From: {moment(item.fromDate).format("MMMM Do, YYYY")}
        </Text>
        <Text style={styles.cardText}>
          To: {moment(item.toDate).format("MMMM Do, YYYY")}
        </Text>
      </View>
    </Pressable>
  )
);

export function Home() {
  const navigation = useNavigation();
  const { payslips } = useContext(AppContext);

  const handleCardPress = useCallback(
    (item: PayslipItem) => {
      navigation.navigate("Payslip", item);
    },
    [navigation]
  );

  const renderCard = useCallback(
    ({ item }: { item: PayslipItem }) => (
      <PayslipCard item={item} onPress={handleCardPress} />
    ),
    [handleCardPress]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payslips</Text>
      <FlatList
        data={payslips}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  cardContent: {
    gap: 4,
  },
  cardText: {
    fontSize: 14,
    color: "#666",
  },
  cardFile: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    fontStyle: "italic",
  },
});
