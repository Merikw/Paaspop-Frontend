import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, AsyncStorage } from 'react-native';

import { LocalStorageKeys } from '../../utilities/constants/constants';
import Loader from '../../components/loader/Loader';
import { getPerformances } from '../../store/actions/performances';
import { updateUser } from '../../store/actions/users';
import { Styles } from '../../assets/GeneralStyle';
import ListItem from '../../components/listItem/ListItem';
import SubListItem from '../../components/listItem/SubListItem';

class PerformancesScreen extends Component {
  state = {
    openendStages: [],
    user: {},
  };

  async componentDidMount() {
    const { onGetPerformances } = this.props;
    onGetPerformances();
    await this.getUser();
  }

  getUser = async () => {
    try {
      const value = await AsyncStorage.getItem(LocalStorageKeys.User.Key);
      if (value !== null) {
        this.setState({
          user: JSON.parse(value),
        });
      }
    } catch (error) {
      alert('Kan de gebruiker niet ophalen, start de app opnieuw op.');
    }
  };

  onOpenStageHandler = key => {
    this.setState(prevstate => ({
      ...prevstate,
      openendStage: prevstate.openendStages.includes(key)
        ? prevstate.openendStages.splice(prevstate.openendStages.indexOf(key), 1)
        : prevstate.openendStages.push(key),
    }));
  };

  updateFavorite = performanceId => {
    const { onUpdateUser, getPerformancesAction } = this.props;
    const { user } = this.state;
    const favoritePerformances = user.favoritePerformances;
    const foundPerformance = favoritePerformances.find(
      p => p.id === performanceId || p.Id == performanceId
    );
    let updateUser;
    if (!foundPerformance) {
      getPerformancesAction.performances.forEach(s => {
        let performance = s.Value.find(p => p.Id === performanceId);
        if (performance) {
          favoritePerformances.push(performance);
        }
      });
      updateUser = {
        ...user,
        favoritePerformances: favoritePerformances,
      };
    } else {
      const index = favoritePerformances.findIndex(
        p => p.id === performanceId || p.Id === performanceId
      );
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
    const isOpened = openendStages.indexOf(item.Key) !== -1;
    return (
      <View key={item.key} style={styles.listItemContainer}>
        <ListItem item={item} onOpen={this.onOpenStageHandler} opened={isOpened} />
        {isOpened ? (
          <SubListItem
            items={item.Value}
            favoritePerformances={user.favoritePerformances}
            onPressIcon={this.updateFavorite}
          />
        ) : (
          <View />
        )}
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
        <ScrollView>
          {getPerformancesAction.performances ? (
            getPerformancesAction.performances.map(item => {
              return this.renderListItems(item);
            })
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
    );
  }
}

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
