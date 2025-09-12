import Header from "@components/chatsScreen/header";
import SearchView from "@components/chatsScreen/searchView";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import { useChatScroll } from "@hooks/useChatScroll";
import { useChatList } from "@providers/ChatsContext";
import useChatsScreenStore from "@stores/ChatsScreen";
import ChatItem from "@components/chatScreen/ChatItem";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export default function ChatsScreen() {
  const { headerHeight } = useChatsScreenStore();
  const [userId, setUserId] = useState();
  const chats = useChatList();
  const { scrollY, listRef, onEndDrag, onScroll } = useChatScroll();

  return (
    <View style={styles.container}>
      <Header scrollY={scrollY} />
      <SearchView />
      <AnimatedFlashList
        ref={listRef}
        // data={chats}
        // renderItem={({ item }) => <ChatItem item={item} userId={userId} />}
        // keyExtractor={(item) => item?.id.toString()}
        // Props for testing scrollY
        data={[1,2,3,4,5,6,7,8,9,10,11,12,13,14]}
        renderItem={() => <View style={{ height: 100, backgroundColor: "red", marginBottom: 10, width: '100%' }} />}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingTop: headerHeight }}
        onScrollEndDrag={onEndDrag}
        onScroll={onScroll}
        scrollEventThrottle={16}
        removeClippedSubviews
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        updateCellsBatchingPeriod={30}
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
