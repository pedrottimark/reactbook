/* @flow */

// These reducers and action creators use string literals for type instead of constants :)

import type { FieldId, FieldValue, Fields } from './reducers/fields';
import type { Record, RecordId, Records } from './reducers/records';

export type Action = {
  type: string,
};

// Action creators related to data: the so-called CRUD operations.

export type CreateRecord = (record: Record) => Action;
export const createRecord: CreateRecord = (record) => ({
  type: 'CREATE_RECORD',
  record,
});

export type ReceiveData = (fields: Fields, records: Records) => Action;
export const receiveData: ReceiveData = (fields, records) => ({
  type: 'RECEIVE_DATA',
  fields,
  records,
});

export type UpdateRecord = (recordId: RecordId, record: Record) => Action;
export const updateRecord: UpdateRecord = (recordId, record) => ({
  type: 'UPDATE_RECORD',
  recordId,
  record,
});

export type UpdateField = (recordId: RecordId, fieldId: FieldId, value: FieldValue) => Action;
export const updateField: UpdateField = (recordId, fieldId, value) => ({
  type: 'UPDATE_FIELD',
  recordId,
  fieldId,
  value,
});

export type DeleteRecord = (recordId: RecordId) => Action;
export const deleteRecord: DeleteRecord = (recordId) => ({
  type: 'DELETE_RECORD',
  recordId,
});

// Action creators related to dialogs.

export type OpenDialog = (verb: string, recordId?: RecordId) => Action;
export const openDialog: OpenDialog = (verb, recordId) => ({
  type: 'OPEN_DIALOG',
  verb,
  recordId,
});

export type CancelDialog = () => Action;
export const cancelDialog: CancelDialog = () => ({
  type: 'CANCEL_DIALOG',
});

// Action creators related to view.

export type SearchRecords = (searching: string) => Action;
export const searchRecords: SearchRecords = (searching) => ({
  type: 'SEARCH_RECORDS',
  searching,
});

export type SortRecords = (fieldId: FieldId) => Action;
export const sortRecords: SortRecords = (fieldId) => ({
  type: 'SORT_RECORDS',
  fieldId,
});
