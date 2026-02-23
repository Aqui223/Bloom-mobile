import { useInsets } from '@hooks'
import type { User } from '@interfaces'
import { Blur, Canvas, Fill, Group, Image, Paint, Shader, Skia, useImage } from '@shopify/react-native-skia'
import useSettingsScreenStore from '@stores/settings'
import { Platform, useWindowDimensions } from 'react-native'
import Animated, { interpolate, type SharedValue, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated'
import { gooeyShader } from './shader'

interface HeaderAvatarProps {
  scrollY: SharedValue<number>
  user: User
}

export default function HeaderAvatar({ scrollY, user }: HeaderAvatarProps): React.JSX.Element {
  const insets = useInsets()
  const START_Y = insets.top + 15

  const cardY = useDerivedValue(() => Math.min(START_Y, START_Y - scrollY.value))
  const snapEndPosition = useSettingsScreenStore((state) => state.snapEndPosition)
  const { width } = useWindowDimensions()
  const image = useImage('https://i.pinimg.com/736x/f8/40/56/f840564f611c2ed373ea289e18ec2113.jpg')

  const CENTER_X = width / 2
  const ISLAND_WIDTH = 90
  const ISLAND_HEIGHT = 32
  const ISLAND_Y = Platform.OS === 'android' ? -ISLAND_HEIGHT : ISLAND_HEIGHT / 2
  const ISLAND_R = 0

  const CARD_SIZE = 100
  const CARD_R = CARD_SIZE / 2
  const CANVAS_HEIGHT = CARD_SIZE + START_Y

  const ballScale = useDerivedValue(() => {
    return interpolate(cardY.value, [-ISLAND_Y, START_Y], [0.35, 1], 'clamp')
  })

  const imageOpacity = useDerivedValue(() => {
    return interpolate(cardY.value, [-ISLAND_Y, START_Y], [0.35, 1], 'clamp')
  })

  const currentRadius = useDerivedValue(() => CARD_R * ballScale.value)

  const uniforms = useDerivedValue(() => {
    return {
      islandCenter: [CENTER_X, ISLAND_Y],
      islandHalfSize: [ISLAND_WIDTH / 2, ISLAND_Y],
      islandRadius: ISLAND_R,
      ballCenter: [CENTER_X, cardY.value + CARD_R],
      ballRadius: currentRadius.value,
      gooeyness: 40.0,
    }
  })

  const clipPath = useDerivedValue(() => {
    const path = Skia.Path.Make()
    path.addCircle(CENTER_X, cardY.value + CARD_R, currentRadius.value)
    return path
  })

  const imageBlur = useDerivedValue(() => {
    return interpolate(cardY.value, [-ISLAND_Y, START_Y], [8, 0], 'clamp')
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(scrollY.get(), [0, snapEndPosition], [0, snapEndPosition], 'clamp') }],
  }))

  return (
    <Animated.View style={[{ width: '100%', height: CANVAS_HEIGHT }, animatedStyle]}>
      <Canvas style={{ flex: 1, backgroundColor: 'transparent' }}>
        <Fill>
          <Shader source={gooeyShader} uniforms={uniforms} />
        </Fill>

        {image && (
          <Group
            layer={
              <Paint blendMode="srcATop" opacity={imageOpacity}>
                <Blur blur={imageBlur} />
              </Paint>
            }
          >
            <Group clip={clipPath}>
              <Group>
                <Image image={image} x={CENTER_X - CARD_R} y={cardY} width={CARD_SIZE} height={CARD_SIZE} fit="cover" />
              </Group>
            </Group>
          </Group>
        )}
      </Canvas>
    </Animated.View>
    // <Animated.View style={[styles.avatarWrapper, animatedStyle]}>
    //   <Avatar size="2xl" image={user?.avatar} username={user?.username || user?.display_name} style={styles.avatar} />
    //   {Platform.OS === 'ios' && <AnimatedBlurView tint="dark" animatedProps={animatedBlurStyle} style={StyleSheet.absoluteFill} />}
    // </Animated.View>
  )
}
