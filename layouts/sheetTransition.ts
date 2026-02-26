import { quickSpring } from '@constants/easings'
import { Platform } from 'react-native'
import { interpolate } from 'react-native-reanimated'
import type { BlankStackNavigationOptions } from 'react-native-screen-transitions/blank-stack'
import { UnistylesRuntime } from 'react-native-unistyles'

export const sheetTransition = (gestures: boolean = true): BlankStackNavigationOptions => {
  const color = UnistylesRuntime.getTheme().colors.background
  const sheetRadius = 38
  const iOS = Platform.OS === 'ios'

  return {
    experimental_enableHighRefreshRate: true,
    gestureEnabled: gestures,
    gestureDirection: ['vertical'],
    screenStyleInterpolator: ({ layouts: { screen }, progress, previous, insets }): any => {
      'worklet'

      const sheetHeight = screen.height * 0.925

      const translateY = interpolate(progress, [0, 1], [screen.height, screen.height - sheetHeight], 'clamp')
      const scale = interpolate(progress, [1, 2], [1, 0.875], 'clamp')
      const opacity = interpolate(progress, [1, 2], [1, 0.5], 'clamp')
      const borderRadius = iOS
        ? interpolate(progress, [1, 2], [insets.top - 12, sheetRadius], 'clamp')
        : interpolate(progress, [1, 2], [insets.top - 16, sheetRadius], 'clamp')

      return {
        contentStyle: {
          transform: previous ? [{ translateY }, { scale }] : [{ scale }],
          overflow: 'hidden',
          opacity: opacity,
          borderTopLeftRadius: previous ? sheetRadius : borderRadius,
          borderTopRightRadius: previous ? sheetRadius : borderRadius,
          borderCurve: 'continuous',
          paddingBottom: previous ? screen.height - sheetHeight : 0,
          backgroundColor: color,
        },
        overlayStyle: {
          opacity: 0,
        },
      }
    },
    transitionSpec: {
      open: quickSpring,
      close: quickSpring,
    },
  }
}
