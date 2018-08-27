import createStore from 'unistore';
import * as rawActions from './actions';
import devEnvironment from '../environments/environment.dev';
import prodEnvironment from '../environments/environment';

import syncMessagingTokens from './sync/sync-messaging-tokens';

const localStorageName = 'firebase-ssr-starter';
const nodeEnv = process.env.NODE_ENV;
const isDevelopment = nodeEnv == 'development';

const localStorageState = getLocalStorage() || {};

const initialState = {
  adminTabIndex: 0,
  claims: {},
  currentUser: {},
  detailUserId: '',
  isSSR: typeof window != 'object',
  isDevelopment: nodeEnv == 'development',
  isSubscribedToFCM: false,
  nodeEnv,
  router: {},
  settings: {},
  subscribedToMessages: false,
  user: {
    claims: {},
  },
  ...localStorageState,
  // Not overridden by localStorageState 👇
  beforeInstallEvent: null,
  environment: isDevelopment ? devEnvironment : prodEnvironment,
  imageDetailSrc: '',
  isDrawerOpen: false,
  loaded: false,
  messagingToken: null,
  notifications: [],
  pathname: '/',
  presence: false,
  query: {},
  serviceWorkerRegistered: false,
};

const store = createStore(initialState);

const actions = store => rawActions;

const mappedActions = {};
for (let i in rawActions) {
  mappedActions[i] = store.action(rawActions[i]);
}

setWindowState();
store.subscribe(setWindowState);

function setWindowState() {
  if (typeof window == 'object') {
    window.state = store.getState();
  }
}

store.subscribe(() => setLocalStorage(store.getState()));
store.subscribe(syncMessagingTokens(mappedActions, store));
// store.subscribe(() => console.info(store.getState()));

function getLocalStorage() {
  let result = {};

  if (typeof window == 'object') {
    const stringified = localStorage.getItem(localStorageName);

    if (stringified) {
      result = JSON.parse(stringified);
    }
  }

  return result;
}

function setLocalStorage(state) {
  localStorage && localStorage.setItem(localStorageName, JSON.stringify(state));
}

export { actions, mappedActions, store };
