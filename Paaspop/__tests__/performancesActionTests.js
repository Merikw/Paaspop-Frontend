/* eslint no-undef: 0 */

/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import {
  getPerformances,
  getPerformancesSuccess,
  getPerformancesIsLoading,
  getPerformancesFailure,
  searchPerformances,
  searchPerformancesSuccess,
  getPerformanceById,
  getPerformanceByIdIsLoading,
  getPerformanceByIdSuccess,
  getPerformanceByIdFailure,
  getFavoritePerformances,
  getFavoritePerformancesFailure,
  getFavoritePerformancesIsLoading,
  getFavoritePerformancesSucces,
} from '../src/store/actions/performances';

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

describe('getPerformances action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should execute get performances success', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess({}));
    });

    const expected = [getPerformancesIsLoading(true), getPerformancesSuccess({})];

    store.dispatch(getPerformances(1)).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });

  it('should execute get performances failure', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(undefined));
    });

    const expected = [getPerformancesIsLoading(true), getPerformancesFailure(undefined)];

    store.dispatch(getPerformances(1)).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });
});

describe('searchPerformances action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  const allperformances = {
    performances: {
      Apollo: {
        value: [
          { stage: 'Apollo', artist: { name: 'Douwe Bob' } },
          { stage: 'Apollo', artist: { name: 'De staat' } },
        ],
      },
    },
  };
  const performancesViewModel = allperformances;

  const newPerformancesViewModelWithResults = {
    performances: [
      {
        value: [{ stage: 'Apollo', artist: { name: 'Douwe Bob' } }],
      },
    ],
  };

  const newPerformancesViewModelWithoutResults = {
    performances: [],
  };

  const newPerformancesViewModelAllResults = {
    performances: [
      {
        value: [
          { stage: 'Apollo', artist: { name: 'Douwe Bob' } },
          { stage: 'Apollo', artist: { name: 'De staat' } },
        ],
      },
    ],
  };

  it('should execute get searchPerformances success with results', done => {
    const store = makeMockStore();

    const expected = [
      searchPerformancesSuccess(newPerformancesViewModelWithResults, allperformances),
    ];

    store.dispatch(searchPerformances('douwe', performancesViewModel, allperformances));
    const actual = store.getActions();
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));

    done();
  });

  it('should execute get searchPerformances success without results', done => {
    const store = makeMockStore();

    const expected = [
      searchPerformancesSuccess(newPerformancesViewModelWithoutResults, allperformances),
    ];

    store.dispatch(searchPerformances('de jeugd', performancesViewModel, allperformances));
    const actual = store.getActions();
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));

    done();
  });

  it('should execute get searchPerformances success with empty search query', done => {
    const store = makeMockStore();

    const expected = [
      searchPerformancesSuccess(newPerformancesViewModelAllResults, allperformances),
    ];

    store.dispatch(searchPerformances(' ', performancesViewModel, allperformances));
    const actual = store.getActions();
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));

    done();
  });
});

describe('getPerformanceById action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should execute get performance by id success', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess({}));
    });

    const expected = [getPerformanceByIdIsLoading(true), getPerformanceByIdSuccess({})];

    store.dispatch(getPerformanceById(1)).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });

  it('should execute get performance by id failure', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(undefined));
    });

    const expected = [getPerformanceByIdIsLoading(true), getPerformanceByIdFailure(undefined)];

    store.dispatch(getPerformanceById(1)).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });
});

describe('getFavoritePerformances action creator', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should execute get favorite performance success', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockSuccess({}));
    });

    const expected = [getFavoritePerformancesIsLoading(true), getFavoritePerformancesSucces({})];

    store.dispatch(getFavoritePerformances(1)).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });

  it('should execute get favorite performance failure', done => {
    const store = makeMockStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith(mockError(undefined));
    });

    const expected = [
      getFavoritePerformancesIsLoading(true),
      getFavoritePerformancesFailure(undefined),
    ];

    store.dispatch(getFavoritePerformances(1)).then(() => {
      const actual = store.getActions();
      expect(actual).toEqual(expected);
    });

    done();
  });
});
