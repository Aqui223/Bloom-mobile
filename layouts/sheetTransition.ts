import { quickSpring } from '@constants/easings'
import { Platform } from 'react-native'
import { interpolate } from 'react-native-reanimated'
import type { BlankStackNavigationOptions } from 'react-native-screen-transitions/blank-stack'
import { UnistylesRuntime } from 'react-native-unistyles'

const TOP_OFFSET = Platform.OS === 'ios' ? 12 : 16
const SHEET_RADIUS = 38

export const sheetTransition = (gestures: boolean = true): BlankStackNavigationOptions => {
  const backgroundColor = UnistylesRuntime.getTheme().colors.background

  return {
    experimental_enableHighRefreshRate: true,
    gestureEnabled: gestures,
    gestureDirection: ['vertical'],
    screenStyleInterpolator: ({ layouts: { screen }, progress, previous, insets }) => {
      'worklet'

      const sheetHeight = screen.height * 0.925

      const translateY = interpolate(progress, [0, 1], [screen.height, screen.height - sheetHeight], 'clamp')

      const scale = interpolate(progress, [1, 2], [1, 0.875], 'clamp')
      const opacity = interpolate(progress, [1, 2], [1, 0.5], 'clamp')

      const borderRadius = interpolate(progress, [1, 2], [insets.top - TOP_OFFSET, SHEET_RADIUS], 'clamp')

      const radius = previous ? SHEET_RADIUS : borderRadius
      const transform = [{ scale }]
      // @ts-expect-error
      if (previous) transform.unshift({ translateY })

      return {
        contentStyle: {
          transform,
          overflow: 'hidden',
          opacity,
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          borderCurve: 'continuous',
          paddingBottom: previous ? screen.height - sheetHeight : 0,
          backgroundColor,
        },
        overlayStyle: { opacity: 0 },
      }
    },
    transitionSpec: {
      open: quickSpring,
      close: quickSpring,
    },
  }
}
