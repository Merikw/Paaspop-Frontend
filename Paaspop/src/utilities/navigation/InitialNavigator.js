import { createSwitchNavigator, createAppContainer } from "react-navigation";

import NavigationContainer from "./NavigationContainer";
import SplashScreen from "../../screens/SplashScreen/SplashScreen";

const InitialNavigator = createSwitchNavigator({
    Splash: SplashScreen,
    App: NavigationContainer
})

export default createAppContainer(InitialNavigator)