import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Switch } from 'react-native-switch';
import Loader from '../../components/loader/Loader';
import CustomModal from '../../components/modal/Modal';
import { getFavoritePerformances } from '../../store/actions/performances';
import { updateUser, removeUser } from '../../store/actions/users';
import { Styles, Colors } from '../../assets/GeneralStyle';
import ListItem from '../../components/listItem/ListItem';
import SubListItemPerformances from '../../components/listItem/SubListItemPerformances';
import getUser from '../../utilities/getUser/getUser';

class OwnScreen extends Component {
  state = {
    isOpened: false,
    user: {},
    visible: false,
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

  componentDidUpdate() {
    const { removeUserAction, navigation } = this.props;
    if (removeUserAction.succes) {
      navigation.navigate('Splash');
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

  removeUser = () => {
    const { onRemoveUser } = this.props;
    const { user } = this.state;
    this.handleModal();
    onRemoveUser(user.id);
  };

  handleModal = () => {
    this.setState(prevState => {
      return {
        visible: !prevState.visible,
      };
    });
  };

  renderListItems = favoritePerformances => {
    const { isOpened } = this.state;
    return (
      <View stlye={styles.favoritePerformancesContainer}>
        <ListItem name="Mijn rooster" onOpen={this.onOpenStageHandler} opened={isOpened} />
        <ScrollView>
          {isOpened ? <SubListItemPerformances items={favoritePerformances} showStage /> : <View />}
        </ScrollView>
      </View>
    );
  };

  render() {
    const { getFavoritePerformancesAction, removeUserAction } = this.props;
    const { user, visible } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Loader
            isLoading={
              getFavoritePerformancesAction.loading || removeUserAction.loading ? true : false
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
        <TouchableOpacity style={styles.textContainer} onPress={this.handleModal}>
          <Text style={[styles.text, styles.dangerText]}>Account verwijderen</Text>
        </TouchableOpacity>
        <CustomModal
          onClose={this.handleModal}
          visible={visible}
          title="Wilt je jouw account definitief verwijderen?"
        >
          <View style={styles.centerContainer}>
            <View style={styles.modalContainer}>
              <TouchableOpacity onPress={this.removeUser}>
                <Text style={[styles.buttonText, styles.dangerText]}>Ja</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text onPress={this.handleModal} style={[styles.buttonText, styles.primaryText]}>
                  Nee
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </CustomModal>
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
  onRemoveUser: PropTypes.func.isRequired,
  getFavoritePerformancesAction: PropTypes.shape(
    PropTypes.objectOf,
    PropTypes.bool,
    PropTypes.bool,
    PropTypes.bool
  ),
  removeUserAction: PropTypes.shape(PropTypes.bool, PropTypes.bool, PropTypes.bool),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

OwnScreen.defaultProps = {
  getFavoritePerformancesAction: { performances: [], error: false, loading: false, succes: false },
  removeUserAction: { error: false, loading: false, succes: false },
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
  favoritePerformancesContainer: {
    maxHeight: '10%',
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
  dangerText: {
    color: Colors.danger,
  },
  centerContainer: { alignItems: 'center' },
  modalContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontFamily: 'LiberationSans-Regular',
    fontSize: 20,
  },
  primaryText: {
    color: Colors.black,
  },
});

const mapStateToProps = state => {
  return {
    getFavoritePerformancesAction: state.performancesStore.getFavoritePerformancesAction,
    removeUserAction: state.usersStore.removeUserAction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetFavoritePerformances: userId => dispatch(getFavoritePerformances(userId)),
    onUpdateUser: user => dispatch(updateUser(user)),
    onRemoveUser: userId => dispatch(removeUser(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnScreen);
