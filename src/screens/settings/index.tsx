import Header from "@components/settingsScreen/header";
import { View } from "react-native";
import { styles } from "./Settings.styles";
import { useSnapScroll } from "@hooks";
import useSettingsScreenStore from "@stores/settings";
import useGetMyself from "@api/hooks/useGetMyself";
import FloatingHeader from "@components/settingsScreen/header/FloatingHeader";
import { AnimatedLegendList } from "@legendapp/list/reanimated";

export default function SettingsScreen() {
  const { snapEndPosition } = useSettingsScreenStore();
  const { scrollY, animatedRef, scrollHandler } = useSnapScroll<any>(snapEndPosition);
  const { user, error, loading } = useGetMyself();

  return (
    <View style={styles.container}>
      <FloatingHeader scrollY={scrollY} user={user}/>
      <AnimatedLegendList
        ref={animatedRef}
        ListHeaderComponent={<Header scrollY={scrollY} user={user} />}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false} 
        data={[1,2,3,4,5,6,7,8,9]}
        renderItem={({ item }) => (
          <View
            key={item}
            style={{
              height: 100,
              marginBottom: 16,
              backgroundColor: 'blue',
              width: "100%",
            }}
          />
        )}
      />
    </View>
  );
}