/* @flow */

// These reducers and action creators use string literals for type instead of constants :)

import type {
  Verb,
} from './reducers/dialogue';
import type {
  FieldId,
  FieldValue,
  Fields,
} from './reducers/fields';
import type {
  Record,
  RecordId,
  Records,
} from './reducers/records';
import type {
  Searching,
} from './reducers/view';

// Action creators related to data: the so-called CRUD operations.

export type CreateRecordAction = {
  type: 'CREATE_RECORD',
  record: Record,
};
export type CreateRecord = (record: Record) => CreateRecordAction;

export const createRecord: CreateRecord = (record) => ({
  type: 'CREATE_RECORD',
  record,
});

export type ReceiveDataAction = {
  type: 'RECEIVE_DATA',
  fields: Fields,
  records: Records,
};
export type ReceiveData = (fields: Fields, records: Records) => ReceiveDataAction;

export const receiveData: ReceiveData = (fields, records) => ({
  type: 'RECEIVE_DATA',
  fields,
  records,
});

export type UpdateRecordAction = {
  type: 'UPDATE_RECORD',
  recordId: RecordId,
  record: Record,
};
export type UpdateRecord = (recordId: RecordId, record: Record) => UpdateRecordAction;

export const updateRecord: UpdateRecord = (recordId, record) => ({
  type: 'UPDATE_RECORD',
  recordId,
  record,
});

export type UpdateFieldAction = {
  type: 'UPDATE_FIELD',
  recordId: RecordId,
  fieldId: FieldId,
  value: FieldValue,
};
export type UpdateField = (recordId: RecordId, fieldId: FieldId, value: FieldValue) => UpdateFieldAction;

export const updateField: UpdateField = (recordId, fieldId, value) => ({
  type: 'UPDATE_FIELD',
  recordId,
  fieldId,
  value,
});

export type DeleteRecordAction = {
  type: 'DELETE_RECORD',
  recordId: RecordId,
};
export type DeleteRecord = (recordId: RecordId) => DeleteRecordAction;

export const deleteRecord: DeleteRecord = (recordId) => ({
  type: 'DELETE_RECORD',
  recordId,
});

// Action creators related to dialogs.

export type OpenDialogAction = {
  type: 'OPEN_DIALOG',
  verb: Verb,
  recordId?: RecordId,
};
export type OpenDialog = (verb: Verb, recordId?: RecordId) => OpenDialogAction;

export const openDialog: OpenDialog = (verb, recordId) => ({
  type: 'OPEN_DIALOG',
  verb,
  recordId,
});

export type CancelDialogAction = {
  type: 'CANCEL_DIALOG',
};
export type CancelDialog = () => CancelDialogAction;

export const cancelDialog: CancelDialog = () => ({
  type: 'CANCEL_DIALOG',
});

// Action creators related to view.

export type SearchRecordsAction = {
  type: 'SEARCH_RECORDS',
  searching: Searching,
};
export type SearchRecords = (searching: Searching) => SearchRecordsAction;

export const searchRecords: SearchRecords = (searching) => ({
  type: 'SEARCH_RECORDS',
  searching,
});

export type SortRecordsAction = {
  type: 'SORT_RECORDS',
  fieldId: FieldId,
};
export type SortRecords = (fieldId: FieldId) => SortRecordsAction;

export const sortRecords: SortRecords = (fieldId) => ({
  type: 'SORT_RECORDS',
  fieldId,
});

export type Action =
  | CreateRecordAction
  | ReceiveDataAction
  | UpdateRecordAction
  | UpdateFieldAction
  | DeleteRecordAction
  | OpenDialogAction
  | CancelDialogAction
  | SearchRecordsAction
  | SortRecordsAction
  ;
