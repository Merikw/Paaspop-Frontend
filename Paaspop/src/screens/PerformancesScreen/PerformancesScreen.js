import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import Loader from '../../components/loader/Loader';
import { getPerformances } from '../../store/actions/performances';
import { updateUser } from '../../store/actions/users';
import { Styles } from '../../assets/GeneralStyle';
import ListItem from '../../components/listItem/ListItem';
import SubListItemPerformances from '../../components/listItem/SubListItemPerformances';
import getUser from '../../utilities/getUser/getUser';

class PerformancesScreen extends Component {
  state = {
    openendStages: [],
    user: {},
  };

  async componentDidMount() {
    const { onGetPerformances, navigation } = this.props;
    onGetPerformances();
    navigation.addListener('willFocus', () => {
      onGetPerformances();
    });
    const response = await getUser();
    if (response) {
      this.setState({
        user: response,
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
      getPerformancesAction.performances.forEach(s => {
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

  renderListItems = item => {
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
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Loader
            isLoading={getPerformancesAction.loading ? getPerformancesAction.loading : false}
          />
          <Text style={Styles.mainText}>Stages</Text>
        </View>
        {getPerformancesAction.performances ? (
          getPerformancesAction.performances.map(item => {
            return this.renderListItems(item);
          })
        ) : (
          <View />
        )}
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
});

const mapStateToProps = state => {
  return {
    getPerformancesAction: state.performancesStore.getPerformancesAction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPerformances: () => dispatch(getPerformances()),
    onUpdateUser: user => dispatch(updateUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformancesScreen);
