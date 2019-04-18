import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Loader from '../../components/loader/Loader';
import CustomModal from '../../components/modal/Modal';
import { getPerformances, getFavoritePerformances } from '../../store/actions/performances';
import { updateUser } from '../../store/actions/users';
import { Styles, Colors } from '../../assets/GeneralStyle';
import ListItem from '../../components/listItem/ListItem';
import SubListItemPerformances from '../../components/listItem/SubListItemPerformances';
import getUser from '../../utilities/getUser/getUser';

let userFavorites = [];
const SUGGESTION_STAGE_NAME = 'Suggesties voor jou!';

class PerformancesScreen extends Component {
  state = {
    openendStages: [],
    user: {},
    visible: null,
    isOverlap: false,
    overlappingArtists: [],
    artistsToNotBeFavorited: [],
    chosenArtist: {},
    chosenArtistVisible: false,
  };

  async componentDidMount() {
    const { onGetPerformances, navigation, onGetFavoritePerformances } = this.props;
    const response = await getUser();
    if (response) {
      this.setState({
        user: response,
      });
      onGetPerformances(response.id);
      onGetFavoritePerformances(response.id);
      navigation.addListener('willFocus', () => {
        onGetFavoritePerformances(response.id);
        onGetPerformances(response.id);
      });
    }
  }

  componentDidUpdate() {
    const { getFavoritePerformancesAction } = this.props;
    if (getFavoritePerformancesAction.succes) {
      userFavorites = getFavoritePerformancesAction.performances;
      this.openModal();
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

  isOverlap = (firstPerformance, secondPerformance) => {
    if (!firstPerformance.performanceTime || !secondPerformance.performanceTime) {
      return false;
    }
    return (
      firstPerformance.performanceTime.day === secondPerformance.performanceTime.day &&
      (firstPerformance.performanceTime.startTime.localeCompare(
        secondPerformance.performanceTime.startTime
      ) == 0 ||
        (firstPerformance.performanceTime.startTime.localeCompare(
          secondPerformance.performanceTime.startTime
        ) == 1 &&
          firstPerformance.performanceTime.startTime.localeCompare(
            secondPerformance.performanceTime.endTime
          ) == -1) ||
        (firstPerformance.performanceTime.startTime.localeCompare(
          secondPerformance.performanceTime.startTime
        ) == -1 &&
          firstPerformance.performanceTime.endTime.localeCompare(
            secondPerformance.performanceTime.startTime
          ) == 1))
    );
  };

  updateFavorite = performanceId => {
    const { getPerformancesAction } = this.props;
    const favoritePerformances = userFavorites;
    let foundPerformance;
    const foundFavoritePerformance = favoritePerformances.find(p => p.id === performanceId);
    const newOverlappingArtists = [];
    let hasOverlap = false;
    if (!foundFavoritePerformance) {
      for (let stage of getPerformancesAction.performancesViewModel.performances) {
        foundPerformance = stage.value.find(p => p.id === performanceId);
        if (foundPerformance !== undefined) {
          newOverlappingArtists.push(foundPerformance);
          break;
        }
      }
      for (let performance of favoritePerformances) {
        if (this.isOverlap(foundPerformance, performance)) {
          hasOverlap = true;
          newOverlappingArtists.push(performance);
        }
      }

      this.setState(prevstate => {
        return {
          ...prevstate,
          isOverlap: hasOverlap,
          overlappingArtists: newOverlappingArtists,
        };
      });
      if (newOverlappingArtists.length <= 1) {
        this.updateUserWithFavorite(performanceId, favoritePerformances, foundFavoritePerformance);
      }
    } else {
      this.updateUserWithFavorite(performanceId, favoritePerformances, foundFavoritePerformance);
    }
  };

  updateUserWithFavorite = (
    performanceId,
    favoritePerformances,
    foundPerformance,
    performancesToNotBeFavorited = undefined
  ) => {
    const { onUpdateUser, getPerformancesAction } = this.props;
    const { user } = this.state;
    let updateUser;
    if (performancesToNotBeFavorited !== undefined) {
      performancesToNotBeFavorited.forEach(performance => {
        const index = favoritePerformances.findIndex(p => p.id === performance.id);
        if (index >= 0) {
          favoritePerformances.splice(index, 1);
        }
      });
    }
    if (!foundPerformance) {
      getPerformancesAction.performancesViewModel.performances.forEach(s => {
        let performance = s.value.find(p => p.id === performanceId);
        if (performance && !favoritePerformances.find(p => p.id === performanceId)) {
          favoritePerformances.push(performance);
        }
      });
      updateUser = {
        ...user,
        userUpdateType: 1,
        favoritePerformances: favoritePerformances.map(p => p.id),
      };
    } else {
      const index = favoritePerformances.findIndex(p => p.id === performanceId);
      favoritePerformances.splice(index, 1);
      updateUser = {
        ...user,
        userUpdateType: 1,
        favoritePerformances: favoritePerformances.map(p => p.id),
      };
    }

    onUpdateUser(updateUser);

    this.setState({
      user: updateUser,
    });
  };

  openModal = () => {
    const { visible } = this.state;
    if (userFavorites.length < 5 && visible === null) {
      this.setState({
        visible: true,
      });
    }
  };

  handleModal = () => {
    this.setState({
      visible: false,
    });
  };

  handleModalChosenArtist = () => {
    this.setState(prevState => {
      return {
        chosenArtistVisible: !prevState.chosenArtistVisible,
      };
    });
  };

  pressPerformance = performance => {
    const { navigation } = this.props;
    navigation.navigate('PerformanceDetail', { performance: performance });
  };

  handleModalOverlap = buttonClicked => () => {
    const { overlappingArtists } = this.state;
    if (buttonClicked === 'yes') {
      let chosenPerformance = overlappingArtists[0];
      overlappingArtists.forEach(performance => {
        if (
          chosenPerformance.interestPercentage.absolutePercentage >
          performance.interestPercentage.absolutePercentage
        ) {
          chosenPerformance = performance;
        }
      });

      const artistsToNotBeFavorited = overlappingArtists.filter(
        performance => performance.id !== chosenPerformance.id
      );
      this.setState({
        artistsToNotBeFavorited: artistsToNotBeFavorited,
        chosenArtist: chosenPerformance.artist,
        chosenArtistVisible: true,
      });

      if (!userFavorites.find(p => p.id === chosenPerformance.id)) {
        this.updateUserWithFavorite(
          chosenPerformance.id,
          userFavorites,
          undefined,
          artistsToNotBeFavorited
        );
      }
    } else {
      this.updateUserWithFavorite(overlappingArtists[0].id, userFavorites, undefined);
    }
    this.setState(prevState => {
      return {
        isOverlap: !prevState.isOverlap,
      };
    });
  };

  renderListItems = item => {
    const { getPerformancesAction } = this.props;
    const { openendStages } = this.state;
    const isOpened = openendStages.indexOf(item.key) !== -1;
    return (
      <View key={item.key} style={styles.listItemContainer}>
        <ListItem name={item.key} onOpen={this.onOpenStageHandler} opened={isOpened} />
        <ScrollView>
          {isOpened ? (
            <SubListItemPerformances
              items={item.value}
              favoritePerformances={userFavorites}
              isSuggestionStage={item.key === SUGGESTION_STAGE_NAME}
              suggestions={getPerformancesAction.performancesViewModel.suggestionPerformances}
              onPressIcon={this.updateFavorite}
              favoriteIcon={item.key === 'Suggesties voor jou!' ? false : true}
              onPressPerformance={this.pressPerformance}
            />
          ) : (
            <View />
          )}
        </ScrollView>
      </View>
    );
  };

  renderOverlappingArtists = overlappingArtists => {
    if (overlappingArtists.length === 2) {
      return overlappingArtists[1].artist.name;
    }

    if (overlappingArtists.length === 3) {
      return overlappingArtists[1].artist.name + ' en ' + overlappingArtists[2].artist.name;
    }

    if (overlappingArtists.length > 3) {
      let overlappingArtistsText = '';
      overlappingArtists.forEach(performance => {
        overlappingArtistsText =
          overlappingArtists[overlappingArtists.length - 1].id === performance.id
            ? overlappingArtistsText + performance.artist.name
            : overlappingArtists[overlappingArtists.length - 2].id === performance.id
            ? overlappingArtistsText + performance.artist.name + ' en '
            : overlappingArtistsText + performance.artist.name + ', ';
      });
      return overlappingArtistsText;
    }
  };

  render() {
    const { getPerformancesAction } = this.props;
    const {
      visible,
      isOverlap,
      chosenArtist,
      chosenArtistVisible,
      overlappingArtists,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Loader
            isLoading={getPerformancesAction.loading ? getPerformancesAction.loading : false}
          />
          <Text style={Styles.mainText}>Stages</Text>
        </View>
        <ScrollView>
          {getPerformancesAction.performancesViewModel ? (
            getPerformancesAction.performancesViewModel.performances.map(item => {
              return this.renderListItems(item);
            })
          ) : (
            <View />
          )}
        </ScrollView>
        <CustomModal
          onClose={this.handleModalChosenArtist}
          visible={chosenArtistVisible}
          title={`${
            chosenArtist.name
          } is voor jou gekozen! Jouw andere favoriet(en) zijn weggehaald.`}
        >
          <View style={styles.centerContainer}>
            <TouchableOpacity>
              <Text
                onPress={this.handleModalChosenArtist}
                style={[styles.buttonText, styles.primaryText]}
              >
                Okay
              </Text>
            </TouchableOpacity>
          </View>
        </CustomModal>
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
        <CustomModal
          onClose={this.handleModalOverlap}
          visible={isOverlap}
          title={
            overlappingArtists.length > 1
              ? `${
                  overlappingArtists[0].artist.name
                } heeft overlap met ${this.renderOverlappingArtists(
                  overlappingArtists
                )}. Wil je de app de keuze laten maken waar je heen moet?`
              : ' '
          }
        >
          <View style={styles.centerContainer}>
            <View style={styles.modalContainer}>
              <TouchableOpacity>
                <Text
                  onPress={this.handleModalOverlap('yes')}
                  style={[styles.buttonText, styles.primaryText]}
                >
                  Ja
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  onPress={this.handleModalOverlap('no')}
                  style={[styles.buttonText, styles.primaryText]}
                >
                  Nee
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </CustomModal>
      </View>
    );
  }
}

PerformancesScreen.propTypes = {
  onGetPerformances: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  onGetFavoritePerformances: PropTypes.func.isRequired,
  getPerformancesAction: PropTypes.shape(
    PropTypes.objectOf,
    PropTypes.bool,
    PropTypes.bool,
    PropTypes.bool
  ),
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

PerformancesScreen.defaultProps = {
  getFavoritePerformancesAction: { performances: [], error: false, loading: false, succes: false },
  getPerformancesAction: { performances: [], error: false, loading: false, succes: false },
};

const styles = StyleSheet.create({
  container: {
    height: '95%',
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
    color: Colors.primary,
  },
});

const mapStateToProps = state => {
  return {
    getPerformancesAction: state.performancesStore.getPerformancesAction,
    getFavoritePerformancesAction: state.performancesStore.getFavoritePerformancesAction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetFavoritePerformances: userId => dispatch(getFavoritePerformances(userId)),
    onGetPerformances: userId => dispatch(getPerformances(userId)),
    onUpdateUser: user => dispatch(updateUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformancesScreen);
