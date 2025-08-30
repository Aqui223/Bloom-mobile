import { StyleSheet } from "react-native-unistyles";
import { View } from "react-native";
import Header from "@components/chatScreen/header/Header";
import Footer from "@components/chatScreen/footer/Footer";
import { FlatList } from "react-native";
import { useUnistyles } from "react-native-unistyles";

export default function ChatScreen({ route }) {
  const { chat } = route.params;
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      <Header chat={chat} />
      <FlatList
        data={Array.from({ length: 40 }).map((_, i) => ({ id: i.toString() }))}
        renderItem={({ item }) => (
            <View style={{ alignItems: item.id % 2 ? "flex-end" : "flex-start"}} key={item.id}>
              <View
                style={{ height: 46, width: '45%', marginVertical: 8, backgroundColor: item.id % 2 ? theme.colors.primary : theme.colors.foreground, borderRadius: theme.radius.full }}
              />
            </View>
        )}
        estimatedListSize={{ height: 46 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        keyExtractor={(item) => item.id}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        updateCellsBatchingPeriod={30}
        inverted
        showsVerticalScrollIndicator={false}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
