import { useInsets } from '@hooks'
import { LayoutChangeEvent } from 'react-native'
import { styles } from './TabBar.styles'
import { GradientBlur } from '@components/ui'
import useTabBarStore from '@stores/tabBar'
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated'
import React, { useCallback } from 'react'
import { useReanimatedKeyboardAnimation } from 'react-native-keyboard-controller'
import { useUnistyles } from 'react-native-unistyles'
import useChatsStore from '@stores/chats'
import TabBarActionButtonDelete from './deleteButton'
import TabBarContainer from './tabBarContainer'
import { layoutAnimation } from '@constants/animations'

export default function TabBar({ state, navigation }): React.JSX.Element {
  const insets = useInsets()
  const { theme } = useUnistyles()
  const { setTabBarHeight, tabBarHeight } = useTabBarStore()
  const { edit } = useChatsStore()
  const { progress: keyboardProgress, height: keyboardHeight } = useReanimatedKeyboardAnimation()

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(keyboardProgress.get(), [0, 1], [0, keyboardHeight.value + (insets.bottom - theme.spacing.lg)], 'clamp') },
    ],
    paddingBottom: insets.bottom,
    paddingHorizontal: keyboardProgress.get() >= 0.1 ? theme.spacing.lg : theme.spacing.xxxl,
  }))

  const onLayoutTabBar = useCallback((event: LayoutChangeEvent) => {
    if (tabBarHeight <= 1) setTabBarHeight(event.nativeEvent.layout.height)
  }, [])

  return (
    <Animated.View
      onLayout={(event) => onLayoutTabBar(event)}
      layout={layoutAnimation}
      style={[styles.tabBarContainer, animatedContainerStyle]}
    >
      <GradientBlur />
      {!edit ? <TabBarContainer state={state} navigation={navigation} /> : <TabBarActionButtonDelete />}
    </Animated.View>
  )
}
