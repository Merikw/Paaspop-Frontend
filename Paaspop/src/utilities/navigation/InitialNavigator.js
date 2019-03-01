import { createSwitchNavigator, createAppContainer } from "react-navigation";

import NavigationContainer from "./NavigationContainer";
import SplashScreen from "../../screens/SplashScreen/SplashScreen";
import LoginNavigator from "./LoginNavigator";

const InitialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    Login: LoginNavigator,
    App: NavigationContainer
})

export default createAppContainer(InitialNavigator)