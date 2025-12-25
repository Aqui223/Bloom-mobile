import Header from "@components/settingsScreen/header";
import { View } from "react-native";
import { styles } from "./Settings.styles";
import { useSnapScroll } from "@hooks";
import useSettingsScreenStore from "@stores/settings";
import useGetMyself from "@api/hooks/useGetMyself";
import FloatingHeader from "@components/settingsScreen/header/FloatingHeader";
import { AnimatedLegendList } from "@legendapp/list/reanimated";
import React, { useCallback } from "react";
import useTabBarStore from "@stores/tabBar";

export default function SettingsScreen(): React.JSX.Element {
  const { snapEndPosition } = useSettingsScreenStore();
  const { tabBarHeight } = useTabBarStore();
  const { scrollY, animatedRef, scrollHandler } = useSnapScroll<any>(snapEndPosition);
  const { user, error, loading } = useGetMyself();

  const keyExtractor = useCallback((item: number) => {
    return String(item)
  }, [])

  return (
    <View style={styles.container}>
      <FloatingHeader scrollY={scrollY} user={user}/>
      <AnimatedLegendList
        ref={animatedRef}
        keyExtractor={keyExtractor}
        ListHeaderComponent={<Header scrollY={scrollY} user={user} />}
        onScroll={scrollHandler}
        contentContainerStyle={{ paddingBottom: tabBarHeight }}
        showsVerticalScrollIndicator={false} 
        data={[1,2,3,4,5,6,7,8,9]}
        renderItem={({ item }) => (
          <View
            key={item}
            style={{
              height: item % 2 ? 54 : 100,
              marginVertical: 12,
              marginHorizontal: 16,
              borderRadius: 28,
              borderCurve: 'continuous',
              backgroundColor: 'rgba(255,255,255, 0.12)',
              flex: 1
            }}
          />
        )}
      />
    </View>
  );
}