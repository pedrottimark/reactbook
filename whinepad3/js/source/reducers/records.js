/* @flow */

import { List, OrderedMap } from 'immutable';

import type { Action } from '../actions';
import type { Fields } from './fields';
import { inView } from './view';
import type { View } from './view';

export type Record = Object;
export type Records = List<Record>;
export type RecordId = number;
export type RecordsInView = OrderedMap<RecordId, Record>;

// Convert internal collection from and to external JSON.
export const recordsFromJSON = (array: Record[]): Records => List(array);
export const recordsToJSON = (records: Records): Record[] => records.toArray();

// Initial state of records before they have been received from storage.
const recordsInitial = recordsFromJSON([]);

export default function (records: Records = recordsInitial, action: Action): Records {
  switch (action.type) {

    case 'RECEIVE_DATA':
      return action.records;

    case 'CREATE_RECORD':
      // Add record as first element of list.
      return records.unshift(action.record);

    case 'DELETE_RECORD':
      return records.delete(action.recordId);

    case 'UPDATE_RECORD':
      return records.set(action.recordId, action.record);

    case 'UPDATE_FIELD':
      return records.update(action.recordId,
        (record) => Object.assign({}, record, { [action.fieldId]: action.value })
      );

    default:
      return records;
  }
}

// Return a sample record when Whinepad runs the first time.
export const recordSample = (fields: Fields): Record =>
  fields.reduce((record, { id: fieldId, sample }) => {
    record[fieldId] = sample;
    return record;
  }, {});

// Selector

// Return records to display in a view, given the sort and search critera.
// A record id is its index in the currently stored list of records.
export const recordsInView = (records: Records, fields: Fields, view: View): RecordsInView =>
  inView(new OrderedMap(records.map((record, recordId) => [recordId, record])), fields, view);
