import createStore from 'unistore';
import * as rawActions from './actions';
import devEnvironment from '../environments/environment.dev';
import prodEnvironment from '../environments/environment';

const localStorageName = 'firebase-ssr-starter';
const nodeEnv = process.env.NODE_ENV;
const isDevelopment = nodeEnv == 'development';

const localStorageState = getLocalStorage() || {};

const initialState = {
  notOverriddenByLocalStorage: true,
  ...localStorageState,
  environment: isDevelopment ? devEnvironment : prodEnvironment,
  isSSR: typeof window != 'object',
  isDrawerOpen: false,
  isDevelopment: nodeEnv == 'development',
  nodeEnv,
  router: {},
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
