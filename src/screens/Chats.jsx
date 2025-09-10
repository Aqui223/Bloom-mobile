import Header from "@components/chatsScreen/header";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { StyleSheet } from "react-native-unistyles";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
} from "react-native-reanimated";
import Chat from "@components/chatsScreen/chat";
import useChatsScreenStore from "@stores/ChatsScreen";
import SearchView from "@components/chatsScreen/searchView";
import { useRef, useState } from "react";
import { useChatList } from "src/providers/ChatsContext";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export default function CardScreen() {
  const scrollY = useSharedValue(0);
  const { headerHeight } = useChatsScreenStore();
  const [userId, setUserId] = useState();
  const chats = useChatList();
  const listRef = useRef(null);

  const getCloser = (value, checkOne, checkTwo) =>
    Math.abs(value - checkOne) < Math.abs(value - checkTwo)
      ? checkOne
      : checkTwo;

  const onEndDrag = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    const clampedY = Math.min(Math.max(scrollY.value, 0), 56);
    const translateY = interpolate(clampedY, [0, 56], [0, -56], "clamp");

    if (!(translateY === 0 || translateY === -56)) {
      if (listRef.current) {
        const snapTo =
          getCloser(translateY, -56, 0) === -56 ? offsetY + 56 : offsetY - 56;

        console.log(snapTo);

        listRef.current.scrollToOffset({
          offset: offsetY - snapTo,
          animated: true,
        });
      }
    }
  };

  const renderItem = ({ item }) => {
    const recipient = item.members.find(
      (member) => member?.id !== parseInt(userId)
    );

    return (
      <Chat
        chat={{
          lastMessage: "Последнее сообщение",
          lastMessageTime: "12:34",
          recipient,
          id: item?.id,
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

  return (
    <View style={styles.container}>
      <Header scrollY={scrollY} />
      <SearchView />
      <AnimatedFlashList
        onMomentumScrollEnd={onEndDrag}
        ref={listRef}
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
        keyExtractor={(item) => item?.id.toString()}
        updateCellsBatchingPeriod={30}
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
