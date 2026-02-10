import { normalSpring } from '@constants/easings'
import { Blur, Canvas, Circle, ColorMatrix, Group, Paint, Rect } from '@shopify/react-native-skia'
import { useEffect, useMemo } from 'react'
import { useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './Message.styles'

interface StatusBubbleProps {
  isActive: boolean
}

export default function StatusBubble({ isActive }: StatusBubbleProps) {
  const { theme } = useUnistyles()
  const progress = useSharedValue(0)

  const RADIUS = 10
  const TARGET_OFFSET = -20

  useEffect(() => {
    progress.value = withSpring(isActive ? -1.45 : -2, normalSpring)
  }, [isActive])

  const cx2 = useDerivedValue(() => {
    return progress.value * TARGET_OFFSET
  })

  const layer = useMemo(() => {
    return (
      <Paint>
        <Blur blur={5} />
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
        <Rect x={29} y={-15} width={10} height={200} color={theme.colors.background} />
        <Circle cx={cx2} cy={15} r={RADIUS} color={theme.colors.primary} />
      </Group>
    </Canvas>
  )
}
