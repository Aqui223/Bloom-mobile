import Header from "@components/chatsScreen/header";
import SearchView from "@components/chatsScreen/searchView";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native-unistyles";
import { useSnapScroll } from "@hooks";
import { useChatList } from "@api/providers/ChatsContext";
import useChatsScreenStore from "@stores/ChatsScreen";
import ChatItem from "@components/chatsScreen/chat/ChatItem";
import { createSecureStorage } from "@lib/storage";
import useTabBarStore from "@stores/tabBar";

const AnimatedFlashList = Animated.createAnimatedComponent(FlashList);

export default function ChatsScreen() {
  const { headerHeight } = useChatsScreenStore();
  const { tabBarHeight } = useTabBarStore();
  const [userId, setUserId] = useState();
  const chats = useChatList();
  const { scrollY, listRef, scrollHandler } = useSnapScroll(56, 100);

  useEffect(() => {
    (async () => {
      const storage = await createSecureStorage("user-storage");
      setUserId(storage.getString("user_id"));
    })()
  }, [])
  
  return (
    <View style={styles.container}>
      <Header scrollY={scrollY} />
      <SearchView />
      <AnimatedFlashList
        ref={listRef}
        data={chats}
        renderItem={({ item, index }) => <ChatItem item={item} index={index} userId={parseInt(userId)} />}
        keyExtractor={(item) => item?.id.toString()}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingTop: headerHeight, paddingBottom: tabBarHeight }}
        onScroll={scrollHandler}
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
