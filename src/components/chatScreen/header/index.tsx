import { styles } from "./Header.styles";
import { View, Text, Pressable } from "react-native";
import Icon from "@components/ui/Icon";
import { useNavigation } from "@react-navigation/native";
import useInsets from "@hooks/useInsets";
import { Avatar, Button } from "@components/ui";
import { useUnistyles } from "react-native-unistyles";    

interface Chat {   
  recipient: {
    username: string;
  }
}

type HeaderProps = {  
  chat?: Chat | null;
}

export default function Header({ chat }: HeaderProps): React.ReactNode {
  const {theme} = useUnistyles() as { theme: any };

  const navigation = useNavigation();
  const insets = useInsets();

  return (
    <View style={[styles.header, {paddingTop: insets.top}]}>
      <Button variant="icon" onPress={() => navigation.goBack()}>
        <Icon icon="chevron.left" size={24} color={theme.colors.text} />
      </Button>
      <Avatar size="md" username={chat?.recipient?.username} />
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{chat?.recipient?.username}</Text>
        <Text style={styles.time}>Была(а) недавно</Text>
      </View>
      <Button variant="icon" onPress={() => navigation.goBack()}>
        <Icon icon="waveform" size={24} color={theme.colors.text} />
      </Button>
      <Button variant="icon" onPress={() => navigation.goBack()}>
        <Icon icon="dots" size={24} color={theme.colors.text} />
      </Button>
    </View>
  );
}
