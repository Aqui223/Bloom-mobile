import Icon from '@components/ui/Icon'
import { quickSpring, springy } from '@constants/animations'
import { TAB_COLORS, TAB_ICONS } from '@constants/tabBar'
import type { TabValue } from '@interfaces'
import { useRouter } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { Pressable, type ViewStyle } from 'react-native'
import { Haptics } from 'react-native-nitro-haptics'
import Animated, { interpolateColor, useAnimatedProps, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './TabBarContainer.styles'

interface TabBarItemProps {
  route: { name: TabValue; key: string }
  focused: boolean
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function TabBarItem({ route, focused }: TabBarItemProps) {
  const { theme } = useUnistyles()
  const color = useSharedValue(0)
  const scale = useSharedValue(1)
  const router = useRouter()

  const TAB_COLORS_RES = TAB_COLORS()

  const iconScale = (out: boolean = false) => {
    scale.value = withSpring(out ? 1 : 1.2, springy)
  }

  const onPress = useCallback(() => {
    if (!focused) {
      // @ts-expect-error idk why it doesn't work without expect-error, but it does work, fuckass expo-router
      router.replace(`/(app)/(tabs)/${route.name === 'index' ? '' : route.name}`)
      Haptics.impact('light')
    }
  }, [focused, route])

  const animatedStyle = useAnimatedStyle(
    (): ViewStyle => ({
      transform: [
        {
          scale: scale.value,
        },
      ],
    }),
  )

  const animatedProps = useAnimatedProps(() => ({
    fill: interpolateColor(color.value, [0, 1], [theme.colors.text, TAB_COLORS_RES[route.name]]),
  }))

  useEffect(() => {
    color.value = withSpring(focused ? 1 : 0, quickSpring)
  }, [focused])

  return (
    <AnimatedPressable
      style={[styles.tabBarItem, animatedStyle]}
      onPress={() => onPress()}
      onPressIn={() => iconScale()}
      onPressOut={() => iconScale(true)}
    >
      <Icon animatedProps={animatedProps} color={theme.colors.text} size={30} icon={TAB_ICONS[route.name]} />
    </AnimatedPressable>
  )
}
