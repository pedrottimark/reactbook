import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Excel from '../../source/components/Excel';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { deleteRecord, receiveData } from '../../source/actions';
import reducer from '../../source/reducers';
import { recordSample, recordsFromJSON } from '../../source/reducers/records';
import fields from '../../source/schema';

const store = createStore(reducer);
store.dispatch(receiveData(fields, recordsFromJSON([recordSample(fields)])));

describe('Excel', () => {

  it('updates a field', () => {
    const table = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <Excel />
      </Provider>
    );
    const recordId = 0;
    const fieldIndex = 0;
    const fieldId = fields[fieldIndex].id;
    const oldname = store.getState().records.get(recordId)[fieldId];
    const cell = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td')[fieldIndex];
    expect(cell.textContent).toBe(oldname);
    const newname = '$2.99 chuck';
    cell.dataset = { // hack around the DOM support in Jest
      recordId: cell.getAttribute('data-record-id'),
      fieldId: cell.getAttribute('data-field-id'),
    };
    TestUtils.Simulate.doubleClick(cell);
    cell.getElementsByTagName('input')[0].value = newname;
    TestUtils.Simulate.submit(cell.getElementsByTagName('form')[0]);
    expect(cell.textContent).toBe(newname);
    expect(store.getState().records.get(recordId)[fieldId]).toBe(newname);
  });

  it('deletes a record', () => {
    const table = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <Excel />
      </Provider>
    );
    const size = store.getState().records.size;
    expect(TestUtils.scryRenderedDOMComponentsWithTag(table, 'td').length).toBe(fields.length * size);
    const recordId = 0;
    store.dispatch(deleteRecord(recordId));
    expect(store.getState().records.size).toBe(size - 1);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(table, 'td').length).toBe(fields.length * (size - 1));
  });

});
