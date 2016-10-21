/*eslint no-console: ["error", { "allow": ["error"] }]  */

import { recordSample, recordsFromStorage, recordsToStorage } from './reducers/records';
import fields from './schema'; // pretend to read the schema from storage

import type { Records } from './reducers/records';

const recordsKey = 'data';

export function readData(callback: Function) {
  const recordsValue = 'localStorage' in window
    ? localStorage.getItem(recordsKey) // null when Whinepad runs the first time
    : null;
  callback({
    fields,
    records: recordsValue
      ? recordsFromStorage(JSON.parse(recordsValue))
      : recordSample(fields),
  });
}

export function writeRecords(records: Records) {
  if ('localStorage' in window) {
    try {
      localStorage.setItem(recordsKey, JSON.stringify(recordsToStorage(records)));
    } catch (e) {
      console.error(e);
    }
  }
}
