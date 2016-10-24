/* @flow */

import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';

import { receiveData } from '../actions';
import reducer from '../reducers';
import { readData, writeRecords } from '../storage'

import Excel from './Excel';
import Logo from './Logo';
import ModalDialogs from './ModalDialogs';
import Toolbar from './Toolbar';

import type { Records } from '../reducers/records';
type SubState = {
  received: boolean,
  records: Records,
};

// Redux is a predictable state container for JavaScript apps.
const logger = createLogger();
const store = createStore(reducer, applyMiddleware(logger));

class Whinepad extends Component {
  unsubscribe: Function;

  componentDidMount() {
    // Redux listener
    let { received: receivedPrev, records: recordsPrev }: SubState = store.getState();
    this.unsubscribe = store.subscribe(() => {
      const { received, records }: SubState = store.getState();
      // After the records have been received, write any changes.
      if (receivedPrev && recordsPrev !== records) {
        writeRecords(records);
      }
      receivedPrev = received;
      recordsPrev = records;
    });
    readData((fields, records) => {
      store.dispatch(receiveData(fields, records));
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <div className="app-header">
          <Logo /> Welcome to Whinepad!
        </div>
        <div className="Whinepad">
          <Toolbar />
          <div className="WhinepadDatagrid">
            <Excel />
          </div>
          <ModalDialogs />
        </div>
      </div>
    );
  }
}

export default () => (
  <Provider store={store}>
    <Whinepad/>
  </Provider>
);
