import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Loader from '../../components/loader/Loader';
import CustomModal from '../../components/modal/Modal';
import { getPerformances } from '../../store/actions/performances';
import { updateUser } from '../../store/actions/users';
import { Styles, Colors } from '../../assets/GeneralStyle';
import ListItem from '../../components/listItem/ListItem';
import SubListItemPerformances from '../../components/listItem/SubListItemPerformances';
import getUser from '../../utilities/getUser/getUser';

class PerformancesScreen extends Component {
  state = {
    openendStages: [],
    user: {},
    visible: false,
  };

  async componentDidMount() {
    const { onGetPerformances, navigation } = this.props;
    const response = await getUser();
    if (response) {
      this.setState({
        user: response,
      });
      onGetPerformances(response.id);
      this.openModal();
      navigation.addListener('willFocus', () => {
        onGetPerformances(response.id);
      });
    }
  }

  onOpenStageHandler = key => {
    const { openendStages } = this.state;
    const newOpenedStages = openendStages;
    openendStages.includes(key)
      ? newOpenedStages.splice(newOpenedStages.indexOf(key), 1)
      : newOpenedStages.push(key),
      this.setState(prevstate => ({
        ...prevstate,
        openendStages: newOpenedStages,
      }));
  };

  updateFavorite = performanceId => {
    const { onUpdateUser, getPerformancesAction } = this.props;
    const { user } = this.state;
    const favoritePerformances = user.favoritePerformances;
    const foundPerformance = favoritePerformances.find(p => p.id === performanceId);
    let updateUser;
    if (!foundPerformance) {
      getPerformancesAction.performancesViewModel.performances.forEach(s => {
        let performance = s.value.find(p => p.id === performanceId);
        if (performance) {
          favoritePerformances.push(performance);
        }
      });
      updateUser = {
        ...user,
        favoritePerformances: favoritePerformances,
      };
    } else {
      const index = favoritePerformances.findIndex(p => p.id === performanceId);
      favoritePerformances.splice(index, 1);
      updateUser = {
        ...user,
        favoritePerformances: favoritePerformances,
      };
    }

    onUpdateUser(user);

    this.setState({
      user: updateUser,
    });
  };

  openModal = () => {
    const { user } = this.state;
    if (user.favoritePerformances.length < 10) {
      this.setState({
        visible: true,
      });
    }
  };

  handleModal = () => {
    this.setState(prevState => {
      return {
        visible: !prevState.visible,
      };
    });
  };

  renderListItems = item => {
    const { getPerformancesAction } = this.props;
    const { openendStages, user } = this.state;
    const isOpened = openendStages.indexOf(item.key) !== -1;
    return (
      <View key={item.key} style={styles.listItemContainer}>
        <ListItem name={item.key} onOpen={this.onOpenStageHandler} opened={isOpened} />
        <ScrollView>
          {isOpened ? (
            <SubListItemPerformances
              items={item.value}
              favoritePerformances={user.favoritePerformances}
              suggestions={getPerformancesAction.performancesViewModel.suggestionPerformances}
              onPressIcon={this.updateFavorite}
              favoriteIcon
            />
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
    );
  };

  render() {
    const { getPerformancesAction } = this.props;
    const { visible } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Loader
            isLoading={getPerformancesAction.loading ? getPerformancesAction.loading : false}
          />
          <Text style={Styles.mainText}>Stages</Text>
        </View>
        {getPerformancesAction.performancesViewModel ? (
          getPerformancesAction.performancesViewModel.performances.map(item => {
            return this.renderListItems(item);
          })
        ) : (
          <View />
        )}
        <CustomModal
          onClose={this.handleModal}
          visible={visible}
          title="Als je minimaal 5 artiesten een like geeft kun je jouw suggesties zien!"
        >
          <View style={styles.centerContainer}>
            <TouchableOpacity>
              <Text onPress={this.handleModal} style={[styles.buttonText, styles.primaryText]}>
                Okay
              </Text>
            </TouchableOpacity>
          </View>
        </CustomModal>
      </View>
    );
  }
}

PerformancesScreen.propTypes = {
  onGetPerformances: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  getPerformancesAction: PropTypes.shape(
    PropTypes.objectOf,
    PropTypes.bool,
    PropTypes.bool,
    PropTypes.bool
  ),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

PerformancesScreen.defaultProps = {
  getPerformancesAction: { performances: [], error: false, loading: false, succes: false },
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
  listItemContainer: {
    flexDirection: 'column',
    paddingBottom: 15,
  },
  centerContainer: { alignItems: 'center' },
  buttonText: {
    fontFamily: 'LiberationSans-Regular',
    fontSize: 20,
  },
  primaryText: {
    color: Colors.primary,
  },
});

const mapStateToProps = state => {
  return {
    getPerformancesAction: state.performancesStore.getPerformancesAction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPerformances: userId => dispatch(getPerformances(userId)),
    onUpdateUser: user => dispatch(updateUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformancesScreen);
