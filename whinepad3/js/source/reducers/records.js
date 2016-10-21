/* @flow */

import { List } from 'immutable';

import type { Action } from '../actions';
import type { FieldValue, Fields } from './fields';
import type { View } from './view';

export type Record = Object;
export type Records = List<Record>;
export type RecordId = number;
export type RecordIds = List<RecordId>;

// Conversions between immutable collection and stored array.
export const recordsFromStorage = (array: Record[]): Records => List(array);
export const recordsToStorage = (records: Records): Record[] => records.toArray();

// Initial state of records before they have been received from storage.
const recordsInitial = recordsFromStorage([]);

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
export const recordSample = (fields: Fields): Record => fields.reduce((record, { id: fieldId, sample }) => {
  record[fieldId] = sample;
  return record;
}, {});

// Selectors

function sortCallback(a: FieldValue, b: FieldValue, descending: boolean): number {
  const res: number = typeof a === 'number' && typeof b === 'number'
    ? a - b
    : String(a).localeCompare(String(b));

  return descending ? -res : res;
}

// Return a List of record ids in a view, given the sort and search critera.
// A record id is its index in the currently stored list of records.
export const recordIdsInView = (records: Records, fields: Fields, { sort, search }: View): RecordIds =>
  records
    .map((record, recordId) => recordId)
    .sort((recordIdA, recordIdB) => sort.reduce((result, { fieldId, descending }) => result || sortCallback(records.get(recordIdA)[fieldId], records.get(recordIdB)[fieldId], descending), 0) || sortCallback(recordIdA, recordIdB, false))
    .filter((recordId) => search.length === 0 || fields.some(({ id: fieldId }) => records.get(recordId)[fieldId].toString().toLowerCase().includes(search)));
