import { GradientBlur } from '@components/ui'
import { layoutAnimation } from '@constants/animations'
import { useInsets } from '@hooks'
import useTabBarStore from '@stores/tabBar'
import type React from 'react'
import { useEffect, useMemo } from 'react'
import { useWindowDimensions } from 'react-native'
import { KeyboardStickyView } from 'react-native-keyboard-controller'
import Animated from 'react-native-reanimated'
import { useUnistyles } from 'react-native-unistyles'
import TabBarActionButtonDelete from './deleteButton'
import { styles } from './TabBar.styles'
import TabBarContainer from './tabBarContainer'

export const TAB_BAR_HEIGHT = 54

const AnimatedStickyView = Animated.createAnimatedComponent(KeyboardStickyView)

export default function TabBar(): React.JSX.Element {
  const { setHeight, setWidth, type } = useTabBarStore()
  const { theme } = useUnistyles()
  const { width } = useWindowDimensions()
  const insets = useInsets()

  const tabBarHeight = useMemo(() => TAB_BAR_HEIGHT + theme.spacing.lg + insets.bottom, [theme, insets.bottom])
  const tabBarWidth = useMemo(() => width - theme.spacing.xxl * 2 - theme.spacing.md - TAB_BAR_HEIGHT, [width, theme])

  useEffect(() => {
    setHeight(tabBarHeight)
    setWidth(tabBarWidth)
  }, [tabBarHeight, tabBarWidth])

  return (
    <AnimatedStickyView
      layout={layoutAnimation}
      offset={{ opened: -theme.spacing.lg, closed: -insets.bottom }}
      style={styles.tabBarContainer}
    >
      <GradientBlur keyboard />
      {type === 'default' ? <TabBarContainer /> : <TabBarActionButtonDelete />}
    </AnimatedStickyView>
  )
}
