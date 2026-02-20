import { useWebSocket } from '@api/providers/WebSocketContext'
import { Button, GradientBlur, Icon } from '@components/ui'
import { charAnimationIn, charAnimationOut, quickSpring, zoomAnimationIn, zoomAnimationOut } from '@constants/animations'
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { useInsets } from '@hooks'
import useChatsStore from '@stores/chats'
import useTabBarStore from '@stores/tabBar'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { useUnistyles } from 'react-native-unistyles'
import { styles } from './header.styles'
import Title from './Title'

const AnimatedButton = Animated.createAnimatedComponent(Button)

export default function Header() {
  const ws = useWebSocket()
  const insets = useInsets()
  const { theme } = useUnistyles()
  const [status, setStatus] = useState('connecting')
  const { setHeaderHeight, setEdit, edit, clearSelectedChats } = useChatsStore()
  const setType = useTabBarStore((state) => state.setType)

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  const animatedButtonStyle = useAnimatedStyle(() => ({
    opacity: withSpring(edit ? 0 : 1, quickSpring),
  }))

  const editPress = () => {
    setEdit(!edit)
    if (edit) clearSelectedChats()
    setType(edit ? 'default' : 'edit')
  }

  useEffect(() => {
    if (ws?.readyState === ws?.OPEN) {
      setStatus('connected')
    } else {
      setStatus('connecting')
    }
  }, [ws])

  const renderBackdrop = useCallback((props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />, [])

  return (
    <View onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)} style={[styles.header, { paddingTop: insets.top }]}>
      <GradientBlur direction="top-to-bottom" />
      <View style={[styles.topHeader]}>
        <Button onPress={editPress} blur variant="icon">
          {edit ? (
            <>
              <Animated.View style={styles.buttonBackground} entering={zoomAnimationIn} exiting={zoomAnimationOut} />
              <Animated.View entering={charAnimationIn()} exiting={charAnimationOut()}>
                <Icon icon="checkmark" color={theme.colors.white} />
              </Animated.View>
            </>
          ) : (
            <Animated.View entering={zoomAnimationIn} exiting={zoomAnimationOut}>
              <Icon icon="pencil" color={theme.colors.text} />
            </Animated.View>
          )}
        </Button>
        <Title state={status} />
        <AnimatedButton onPress={handlePresentModalPress} style={animatedButtonStyle} blur variant="icon">
          <Icon icon="plus" color={theme.colors.text} />
        </AnimatedButton>
        <BottomSheetModal enablePanDownToClose backdropComponent={renderBackdrop} ref={bottomSheetModalRef} onChange={handleSheetChanges}>
          <BottomSheetView style={{ flex: 1, alignItems: 'center' }}>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </View>
  )
}
