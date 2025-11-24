import { useInsets } from "@hooks";
import TabBarItem from "./Item";
import { View } from "react-native";
import { styles } from "./TabBar.styles";
import TabBarIndicator from "./Indicator";
import { GradientBlur } from "@components/ui";
import { Haptics } from "react-native-nitro-haptics";
import useTabBarStore from "@stores/tabBar";
import Animated from "react-native-reanimated";
import { layoutAnimationSpringy } from "@constants/animations";
import TabBarSearchButton from "./SearchButton";

export default function TabBar({ state, navigation }) {
	const insets = useInsets();
	const { setTabBarHeight } = useTabBarStore();

	return (
		<View onLayout={e => setTabBarHeight(e.nativeEvent.layout.height)} style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}>
			<GradientBlur />
			<Animated.View style={styles.tabBar} layout={layoutAnimationSpringy}>
				<TabBarIndicator index={state.index} count={state.routes.length} />
				{state.routes.map((route, index) => {
					const focused = state.index === index;

					const onPress = () => {
						const event = navigation.emit({
							type: "tabPress",
							target: route.key,
							canPreventDefault: true,
						});

						if (!focused && !event.defaultPrevented) {
							Haptics.impact("light");
							navigation.navigate(route.name);
						}
					};

					return <TabBarItem key={route.key} route={route} focused={focused} onPress={onPress} />;
				})}
			</Animated.View>
			<TabBarSearchButton />
		</View>
	);
}
