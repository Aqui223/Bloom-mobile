import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ROUTES } from "@constants/Routes";
import { CardScreen, SettingsScreen } from "@screens";
import TabBar from ".";
import { quickSpring } from "@constants/easings";
import { useUnistyles } from "react-native-unistyles";

const Tab = createBottomTabNavigator();

const options = {
	transitionSpec: {
		animation: "spring",
		config: {
			mass: quickSpring.mass,
			damping: quickSpring.damping,
			stiffness: quickSpring.stiffness,
		},
	},
};

export default function MainTabNavigator() {
  const {theme} = useUnistyles();

	return (
		<Tab.Navigator
			tabBar={props => <TabBar {...props} />}
			screenOptions={{
				headerShown: false,
				sceneStyle: {
					backgroundColor: theme.colors.background,
				},
				animation: "fade",
			}}
		>
			<Tab.Screen options={options} name={ROUTES.TAB_CHATS} component={CardScreen} />
			<Tab.Screen options={options} name={ROUTES.TAB_SEARCH} component={SettingsScreen} />
			<Tab.Screen options={options} name={ROUTES.TAB_SETTINGS} component={SettingsScreen} />
		</Tab.Navigator>
	);
}
