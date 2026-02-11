import { normalSpring } from '@constants/easings'
import { Blur, Canvas, ColorMatrix, Group, Paint, Rect, RoundedRect } from '@shopify/react-native-skia'
import { useEffect, useLayoutEffect, useMemo } from 'react'
import { interpolate, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated'
import { useUnistyles } from 'react-native-unistyles'
import { scheduleOnRN } from 'react-native-worklets'
import { styles } from './Message.styles'

interface StatusBubbleProps {
  isActive: boolean
  setMountFinished: (value: boolean) => void
}

export default function StatusBubble({ isActive, setMountFinished }: StatusBubbleProps) {
  const { theme } = useUnistyles()
  const progress = useSharedValue(0)

  const TARGET_OFFSET = 21

  useLayoutEffect(() => {
    progress.value = withSpring(isActive ? 1 : 5.7, normalSpring, (_finished) => scheduleOnRN(setMountFinished, true))
  }, [isActive])

  const cx2 = useDerivedValue(() => {
    return progress.value * TARGET_OFFSET
  })

  const width = useDerivedValue(() => {
    const w = interpolate(progress.value, [1, 5.7], [82, 41])
    return w
  })

  const height = useDerivedValue(() => {
    const h = interpolate(progress.value, [1, 5.7], [42, 21])
    return h
  })

  const y = useDerivedValue(() => {
    const offset = interpolate(progress.value, [1, 5.7], [10, 20])
    return offset
  })

  const layer = useMemo(() => {
    return (
      <Paint>
        <Blur blur={6} />
        <ColorMatrix
          matrix={[
            // R, G, B, A, Bias (Offset)
            // prettier-ignore
            1, 0, 0, 0, 0,
            // prettier-ignore
            0, 1, 0, 0, 0,
            // prettier-ignore
            0, 0, 1, 0, 0,
            // prettier-ignore
            0, 0, 0, 20, -10,
          ]}
        />
      </Paint>
    )
  }, [])

  return (
    <Canvas style={styles.statusCanvas}>
      <Group layer={layer}>
        <Rect x={120} y={-100} width={200} height={200} color={theme.colors.background} />
        <RoundedRect r={30} x={cx2} y={y} width={width} height={height} color={theme.colors.primary} />
      </Group>
    </Canvas>
  )
}
