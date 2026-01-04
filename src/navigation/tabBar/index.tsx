import React from 'react'
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'
import { ROUTES } from '@constants/routes'
import { ChatsScreen, SettingsScreen } from '@screens'
import TabBar from './TabBar'
import { quickSpring } from '@constants/easings'

const Tab = createBottomTabNavigator()

const springOptions: BottomTabNavigationOptions = {
  transitionSpec: {
    animation: 'spring',
    config: quickSpring,
  },
}

export default function MainTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      {...({ id: 'mainTabs' } as any)}
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        sceneStyle: { backgroundColor: 'black' },
      }}
    >
      <Tab.Screen name={ROUTES.tabs.friends} component={ChatsScreen} options={springOptions} />
      <Tab.Screen name={ROUTES.tabs.search} component={SettingsScreen} options={springOptions} />
      <Tab.Screen name={ROUTES.tabs.chats} component={ChatsScreen} options={springOptions} />
      <Tab.Screen name={ROUTES.tabs.settings} component={SettingsScreen} options={springOptions} />
    </Tab.Navigator>
  )
}
