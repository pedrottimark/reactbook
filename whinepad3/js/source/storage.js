/*eslint no-console: ["error", { "allow": ["error"] }]  */

import { recordSample, recordsFromJSON, recordsToJSON } from './reducers/records';
import fields from './schema'; // pretend to read the schema from storage

import type { ReceiveData } from './actions';
import type { Records } from './reducers/records';

const recordsKey = 'data';

export function readData(callback: ReceiveData) {
  const recordsValue = 'localStorage' in window
    ? localStorage.getItem(recordsKey) // null when Whinepad runs the first time
    : null;
  callback(fields, recordsFromJSON(recordsValue
    ? JSON.parse(recordsValue)
    : [recordSample(fields)]
  ));
}

export function writeRecords(records: Records) {
  if ('localStorage' in window) {
    try {
      localStorage.setItem(recordsKey, JSON.stringify(recordsToJSON(records)));
    } catch (e) {
      console.error(e);
    }
  }
}
