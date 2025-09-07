import Header from "@components/chatsScreen/header";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from "react-native-unistyles";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from "react-native-reanimated";
import Chat from "@components/chatsScreen/chat";
import useChatsScreenStore from "@stores/ChatsScreen";
import SearchView from "@components/chatsScreen/searchView";
import { getChats } from "@lib/api";
import { useEffect, useState } from "react";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export default function CardScreen() {
  const scrollY = useSharedValue(0);
  const { headerHeight } = useChatsScreenStore();
  const [chats, setChats] = useState([]);

  const renderItem = ({ item }) => {
    console.log(item.members[0].id)
    return (
      <Chat
        chat={{
          name: "Чат " + item.members[0].id,
          lastMessage: "Последнее сообщение",
          lastMessageTime: "12:34",
          avatar:
            "https://i.pinimg.com/736x/e9/83/3b/e9833b429842c971097ab6e9ad3bf6ca.jpg",
          unreadCount: item.id % 3,
        }}
      />
    );
  };

  const onscroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  useEffect(() => {
    (async () => {
      const res = await getChats();
      setChats(res);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Header scrollY={scrollY} />
      <SearchView/>
      <AnimatedFlashList
        onScroll={onscroll}
        estimatedItemSize={100}
        data={chats}
        contentContainerStyle={{
          paddingTop: headerHeight,
        }}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        scrollEventThrottle={16}
        updateCellsBatchingPeriod={30}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
