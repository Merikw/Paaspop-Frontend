/* eslint no-undef: 0 */

/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import {
  addUser,
  addUserFailure,
  addUserIsLoading,
  addUserSuccess,
  removeUser,
  removeUserFailure,
  removeUserIsLoading,
  removeUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserIsLoading,
  updateUserSuccess,
} from '../src/store/actions/users';

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

describe('createUser action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should execute create user success', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess({}));
    });

    const expected = [addUserIsLoading(true), addUserSuccess({})];

    store.dispatch(addUser({})).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });

  it('should execute create user failure', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(undefined));
    });

    const expected = [addUserIsLoading(true), addUserFailure(undefined)];

    store.dispatch(addUser({})).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });
});

describe('removeUser action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should execute remove user success', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess({}));
    });

    const expected = [removeUserIsLoading(true), removeUserSuccess({})];

    store.dispatch(removeUser(1)).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });

  it('should execute remove user failure', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(undefined));
    });

    const expected = [removeUserIsLoading(true), removeUserFailure(undefined)];

    store.dispatch(removeUser(1)).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });
});

describe('updateUser action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should execute update user success', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess({}));
    });

    const expected = [updateUserIsLoading(true), updateUserSuccess({})];

    store.dispatch(updateUser({})).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });

  it('should execute create user failure', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(undefined));
    });

    const expected = [updateUserIsLoading(true), updateUserFailure(undefined)];

    store.dispatch(updateUser({})).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });
});
