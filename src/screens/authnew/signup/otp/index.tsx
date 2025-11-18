import React from "react";
import { View } from "react-native";
import { styles } from "./Otp.styles";
import AuthTitleTemplate from "@components/auth/titleTemplate";
import { ActionText, OTPInput } from "@components/ui";
import useAuthStore from "@stores/auth";

export default function SignUpOTP(): React.JSX.Element {
    const { email, otp, setOtp } = useAuthStore();

	return (
		<View style={styles.container}>
			<AuthTitleTemplate image={require("@assets/emojiIcons/monkey.webp")} title='Проверка почты' />
            <OTPInput value={otp} onChange={setOtp}/>
            <ActionText children="Введите 6-значный код, который был отправлен на" actionText={email}/>
		</View>
	);
}
