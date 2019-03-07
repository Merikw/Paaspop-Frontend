/* eslint react/display-name: 0 */
/* eslint react/prop-types  : 0 */

import React from 'react';

import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import MapScreen from '../../screens/MapScreen/MapScreen';
import PerformancesScreen from '../../screens/PerformancesScreen/PerformancesScreen';
import PlacesScreen from '../../screens/PlacesScreen/PlacesScreen';
import OwnScreen from '../../screens/OwnScreen/OwnScreen';

import Header from '../../components/header/Header';
import { Colors } from '../../assets/GeneralStyle';

const AppNavigator = createStackNavigator({
  Tab: {
    screen: createBottomTabNavigator(
      {
        Map: {
          screen: MapScreen,
          navigationOptions: {
            tabBarLabel: 'Plattegrond',
            tabBarIcon: ({ tintColor }) => <Icon name="md-map" size={20} color={tintColor} />,
          },
        },
        Performances: {
          screen: PerformancesScreen,
          navigationOptions: {
            tabBarLabel: 'Artiesten',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="md-microphone" size={20} color={tintColor} />
            ),
          },
        },
        Places: {
          screen: PlacesScreen,
          navigationOptions: {
            tabBarLabel: 'Plekken',
            tabBarIcon: ({ tintColor }) => <Icon name="md-locate" size={20} color={tintColor} />,
          },
        },
        Own: {
          screen: OwnScreen,
          navigationOptions: {
            tabBarLabel: 'Zelf',
            tabBarIcon: ({ tintColor }) => <Icon name="md-person" size={20} color={tintColor} />,
          },
        },
      },
      {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
          activeTintColor: Colors.white,
          inactiveTintColor: Colors.black,
          activeBackgroundColor: Colors.primary,
          style: {
            backgroundColor: Colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          },
          labelStyle: {
            fontSize: 14,
            fontFamily: 'LiberationSans-Regular',
            padding: 0,
            margin: 0,
          },
        },
      }
    ),
    navigationOptions: Header,
  },
});

export default createAppContainer(AppNavigator);
