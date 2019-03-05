import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from '../../screens/LoginScreen/LoginScreen';

const LoginNavigator = createStackNavigator({
  Login: LoginScreen,
});

export default createAppContainer(LoginNavigator);
