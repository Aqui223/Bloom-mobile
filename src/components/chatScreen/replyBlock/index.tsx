import { Button, Icon } from "@components/ui";
import React from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

export default function ReplyBlock(): React.JSX.Element {
    return (
        <Animated.View>
            <View>
                <View>
                    <Text>
                        Reply to
                    </Text>
                    <Text>
                        Swagiest text 
                    </Text>
                </View>
                <Button>
                    <Icon icon="star" />
                </Button>
            </View>
        </Animated.View>
    )
}