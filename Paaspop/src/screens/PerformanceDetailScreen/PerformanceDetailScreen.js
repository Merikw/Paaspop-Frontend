import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { getPerformanceById } from '../../store/actions/performances';
import { Styles, Colors } from '../../assets/GeneralStyle';
import Loader from '../../components/loader/Loader';
import ImagePlaceHolder from '../../assets/icons/no-image.png';

class PerformanceDetailScreen extends Component {
  componentDidMount() {
    const { onGetPerformanceById, navigation } = this.props;
    const performance = navigation.getParam('performance', {});

    onGetPerformanceById(performance.id);
  }

  render() {
    const renderGenres = (genre, isLast) => {
      return (
        <Text key={genre} style={styles.artistMetaDataText}>{`${genre}${isLast ? '' : ', '}`}</Text>
      );
    };

    const getDay = performance => {
      switch (performance.performanceTime.day) {
        case 5:
          return 'Vrijdag';
        case 6:
          return 'Zaterdag';
        case 7:
          return 'Zondag';
      }
    };

    const { getPerformanceByIdAction } = this.props;
    return (
      <View style={styles.container}>
        {!getPerformanceByIdAction.succes ? (
          <View style={styles.innerContainer}>
            <Loader
              isLoading={
                getPerformanceByIdAction.loading ? getPerformanceByIdAction.loading : false
              }
            />
          </View>
        ) : (
          <View style={styles.innerContainer}>
            <Text style={Styles.mainText}>{getPerformanceByIdAction.performance.artist.name}</Text>
            <Image
              style={styles.image}
              source={
                getPerformanceByIdAction.performance.artist.imageLink
                  ? {
                      uri: getPerformanceByIdAction.performance.artist.imageLink.urlText,
                    }
                  : ImagePlaceHolder
              }
            />
            <View style={styles.hr} />
            <ScrollView style={styles.summary} showsVerticalScrollIndicator={false}>
              <Text style={styles.summaryText}>
                {getPerformanceByIdAction.performance.artist.summary}
              </Text>
            </ScrollView>
            <View style={styles.hr} />
            <View style={styles.artistMetaData}>
              <Text style={[styles.artistMetaDataText, styles.artistMetaDataTextFirst]}>
                Genres:
              </Text>
              <ScrollView horizontal>
                {getPerformanceByIdAction.performance.artist.genres.length > 0 ? (
                  getPerformanceByIdAction.performance.artist.genres.map(genre => {
                    return renderGenres(
                      genre,
                      genre ===
                        getPerformanceByIdAction.performance.artist.genres[
                          getPerformanceByIdAction.performance.artist.genres.length - 1
                        ]
                    );
                  })
                ) : (
                  <Text>Onbekend</Text>
                )}
              </ScrollView>
            </View>
            <View style={styles.artistMetaData}>
              <Text style={[styles.artistMetaDataText, styles.artistMetaDataTextFirst]}>Tijd:</Text>
              <Text style={styles.artistMetaDataText}>
                {`${
                  getPerformanceByIdAction.performance.performanceTime
                    ? getDay(getPerformanceByIdAction.performance)
                    : '???'
                } - ${
                  getPerformanceByIdAction.performance.performanceTime
                    ? getPerformanceByIdAction.performance.performanceTime.startTime
                    : '???'
                } - ${
                  getPerformanceByIdAction.performance.performanceTime
                    ? getPerformanceByIdAction.performance.performanceTime.endTime
                    : '???'
                }`}
              </Text>
            </View>
            <View style={styles.artistMetaData}>
              <Text style={[styles.artistMetaDataText, styles.artistMetaDataTextFirst]}>
                Stage:
              </Text>
              <Text style={styles.artistMetaDataText}>
                {getPerformanceByIdAction.performance.stage.name}
              </Text>
            </View>
            <View style={styles.crowdBarContainer}>
              <Text style={styles.InterestText}>Interesse meter</Text>
              <View style={styles.crowdBar}>
                <View
                  style={[
                    {
                      width: `${
                        getPerformanceByIdAction.performance.interestPercentage.absolutePercentage
                      }%`,
                    },
                    styles.filler,
                  ]}
                />
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

PerformanceDetailScreen.propTypes = {
  onGetPerformanceById: PropTypes.func.isRequired,
  getPerformanceByIdAction: PropTypes.shape(
    PropTypes.objectOf,
    PropTypes.bool,
    PropTypes.bool,
    PropTypes.bool
  ),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

PerformanceDetailScreen.defaultProps = {
  getPerformanceByIdAction: { performance: {}, error: false, loading: false, succes: false },
};

const styles = StyleSheet.create({
  container: {
    height: '95%',
    marginTop: '20%',
    marginLeft: '3%',
    marginRight: '5%',
  },
  image: {
    marginTop: '5%',
    marginBottom: '5%',
    width: '70%',
    minHeight: '25%',
    maxHeight: '30%',
  },
  hr: {
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    width: '100%',
  },
  innerContainer: {
    alignItems: 'center',
    height: '100%',
  },
  summary: {
    flexGrow: 0,
    marginTop: '3%',
    marginBottom: '3%',
    maxHeight: '25%',
  },
  summaryText: {
    fontFamily: 'LiberationSans-Regular',
    fontSize: 16,
    color: Colors.black,
  },
  artistMetaData: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: '2%',
    height: '5%',
  },
  artistMetaDataText: {
    fontFamily: 'LiberationSans-Regular',
    fontSize: 16,
    color: Colors.black,
  },
  artistMetaDataTextFirst: {
    minWidth: '25%',
    fontFamily: 'LiberationSans-Bold',
  },
  crowdBar: {
    height: '100%',
    width: '90%',
    backgroundColor: Colors.gray,
    maxHeight: '80%',
    alignSelf: 'center',
  },
  crowdBarContainer: {
    width: '100%',
    justifyContent: 'center',
    paddingRight: '2%',
    marginTop: '5%',
    height: '2.5%',
    alignItems: 'center',
  },
  InterestText: {
    fontFamily: 'LiberationSans-Italic',
    fontSize: 12,
  },
  filler: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
});

const mapStateToProps = state => {
  return {
    getPerformanceByIdAction: state.performancesStore.getPerformanceByIdAction,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPerformanceById: performanceId => dispatch(getPerformanceById(performanceId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PerformanceDetailScreen);
