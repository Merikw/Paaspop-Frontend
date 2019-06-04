/* eslint no-undef: 0 */

/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import {
  getBestPlaces,
  getBestPlacesFailure,
  getBestPlacesIsLoading,
  getBestPlacesSuccess,
  generateMeetingPoint,
  generateMeetingPointFailure,
  generateMeetingPointIsLoading,
  generateMeetingPointSuccess,
} from '../src/store/actions/places';

const startState = {};
const mockStore = configureMockStore([thunk]);
const makeMockStore = (state = {}) => {
  return mockStore({
    ...startState,
    ...state,
  });
};

const mockSuccess = data => ({ status: 200, response: data });
const mockError = error => ({ status: 500, response: error });

describe('getBestPlaces action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should execute get best places success', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess({}));
    });

    const expected = [getBestPlacesIsLoading(true), getBestPlacesSuccess({})];

    store.dispatch(getBestPlaces(5.5, 3.3)).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });

  it('should execute get best places failure', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(undefined));
    });

    const expected = [getBestPlacesIsLoading(true), getBestPlacesFailure(undefined)];

    store.dispatch(getBestPlaces(5.5, 3.3)).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });
});

describe('generateMeetingpoint action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should execute generate meetingpoint success', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess({}));
    });

    const expected = [generateMeetingPointIsLoading(true), generateMeetingPointSuccess({})];

    store.dispatch(generateMeetingPoint(5.5, 3.3)).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });

  it('should execute generate meetingpoint failure', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(undefined));
    });

    const expected = [generateMeetingPointIsLoading(true), generateMeetingPointFailure(undefined)];

    store.dispatch(getBestPlaces(5.5, 3.3)).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });
});
