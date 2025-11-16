import { createNativeStackNavigator } from "react-native-screen-transitions";
import { ROUTES } from "@constants/routes";
import { SignUpEmailScreen, WelcomeScreen } from "../screens";
import { screenTransition } from "./transition";
import { View } from "react-native";
import AuthHeader from "@components/auth/header";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {

  return (
    <>
      <Stack.Navigator
       {...({ id: "authNavigator"} as any)}
       layout={({ children, state, navigation }) => (
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <AuthHeader navigation={navigation}/>
          {children}
        </View>
      )}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#00000000' }
        }}
        
      >
        <Stack.Screen name={ROUTES.auth.welcome} component={WelcomeScreen} />
        <Stack.Screen name={ROUTES.auth.login} component={WelcomeScreen} options={screenTransition(false)} />
        <Stack.Screen name={ROUTES.auth.signup.email} component={SignUpEmailScreen} options={screenTransition(false)} />
        <Stack.Screen name={ROUTES.auth.signup.otp} component={WelcomeScreen} options={screenTransition(false)} />
        <Stack.Screen name={ROUTES.auth.signup.password} component={WelcomeScreen} options={screenTransition(false)} />
      </Stack.Navigator>
    </>
  );
};

export default AuthNavigator;
