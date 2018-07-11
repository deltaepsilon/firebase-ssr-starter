import createStore from 'unistore';
import * as rawActions from './actions';

const defaultState = {};

const store = createStore(defaultState);

const actions = store => rawActions;

const mappedActions = {};
for (let i in rawActions) {
  mappedActions[i] = store.action(rawActions[i]);
}

export { actions, mappedActions, store };
