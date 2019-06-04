/* eslint no-undef: 0 */

/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import MockAsyncStorage from 'mock-async-storage';

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-community/async-storage', () => mockImpl);
