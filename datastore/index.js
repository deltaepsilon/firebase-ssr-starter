import createStore from 'unistore';
import * as rawActions from './actions';
import devEnvironment from '../environments/environment.dev';
import prodEnvironment from '../environments/environment';

const nodeEnv = process.env.NODE_ENV;
const isDevelopment = nodeEnv == 'development';

const initialState = {
  nodeEnv,
  isDevelopment: nodeEnv == 'development',
  environment: isDevelopment ? devEnvironment : prodEnvironment,
  isDrawerOpen: false,
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

export { actions, mappedActions, store };
