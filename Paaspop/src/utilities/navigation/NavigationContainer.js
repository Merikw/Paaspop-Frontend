import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import StartScreen from '../../screens/StartScreen/StartScreen';

const AppNavigator = createBottomTabNavigator({
  Start: {
    screen: StartScreen,
  },
});

export default createAppContainer(AppNavigator);
