import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { Switch } from 'react-native-switch';
import Loader from '../../components/loader/Loader';
import { getFavoritePerformances } from '../../store/actions/performances';
import { updateUser } from '../../store/actions/users';
import { Styles, Colors } from '../../assets/GeneralStyle';
import ListItem from '../../components/listItem/ListItem';
import SubListItemPerformances from '../../components/listItem/SubListItemPerformances';
import getUser from '../../utilities/getUser/getUser';

class OwnScreen extends Component {
  state = {
    isOpened: false,
    user: {},
  };

  async componentDidMount() {
    const { onGetFavoritePerformances, navigation } = this.props;
    const response = await getUser();
    if (response) {
      this.setState({
        user: response,
      });
      onGetFavoritePerformances(response.id);
      navigation.addListener('willFocus', () => {
        onGetFavoritePerformances(response.id);
      });
    }
  }

  onOpenStageHandler = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        isOpened: !prevState.isOpened,
      };
    });
  };

  updateUser = (id, val) => {
    const { onUpdateUser } = this.props;
    const { user } = this.state;
    let newUser = user;
    if (id === 'weather') {
      newUser = {
        ...user,
        wantsWeatherForecast: val,
      };
    } else {
      newUser = {
        ...user,
        wantsWaterDrinkNotification: val,
      };
    }

    this.setState({
      user: newUser,
    });

    onUpdateUser(newUser);
  };

  renderListItems = favoritePerformances => {
    const { isOpened } = this.state;
    return (
      <View>
        <ListItem name="Mijn rooster" onOpen={this.onOpenStageHandler} opened={isOpened} />
        <ScrollView>
          {isOpened ? <SubListItemPerformances items={favoritePerformances} showStage /> : <View />}
        </ScrollView>
      </View>
    );
  };

  render() {
    const { getFavoritePerformancesAction } = this.props;
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Loader
            isLoading={
              getFavoritePerformancesAction.loading ? getFavoritePerformancesAction.loading : false
            }
          />
          <Text style={Styles.mainText}>Zelf</Text>
        </View>
        <View style={[styles.firsTextContainer, styles.textContainer]}>
          <Text style={styles.text}>Weersverwachting</Text>
          <Switch
            value={user.wantsWeatherForecast}
            backgroundActive={Colors.primary}
            backgroundInactive={Colors.gray}
            circleSize={25}
            onValueChange={val => this.updateUser('weather', val)}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Water drink melding</Text>
          <Switch
            value={user.wantsWaterDrinkNotification}
            backgroundActive={Colors.primary}
            backgroundInactive={Colors.gray}
            circleSize={25}
            onValueChange={val => this.updateUser('water', val)}
          />
        </View>
        {getFavoritePerformancesAction.performances ? (
          this.renderListItems(getFavoritePerformancesAction.performances)
        ) : (
          <View />
        )}
      </View>
    );
  }
}

OwnScreen.propTypes = {
  onGetFavoritePerformances: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  getFavoritePerformancesAction: PropTypes.shape(
    PropTypes.objectOf,
    PropTypes.bool,
    PropTypes.bool,
    PropTypes.bool
  ),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

OwnScreen.defaultProps = {
  getFavoritePerformancesAction: { performances: [], error: false, loading: false, succes: false },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '20%',
    marginLeft: '3%',
    marginRight: '5%',
  },
  innerContainer: {
    alignItems: 'center',
  },
  text: {
    color: Colors.black,
    fontFamily: 'LiberationSans-Regular',
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: '10%',
  },
  firsTextContainer: {
    marginTop: '8%',
  },
});

const mapStateToProps = state => {
  return {
    getFavoritePerformancesAction: state.performancesStore.getFavoritePerformancesAction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetFavoritePerformances: userId => dispatch(getFavoritePerformances(userId)),
    onUpdateUser: user => dispatch(updateUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnScreen);
