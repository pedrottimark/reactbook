import type { Action } from '../actions';
import type { FieldId, FieldValue, Fields } from './fields';
import type { Record, RecordsInView } from './records';

type Sorting = {
  fieldId: FieldId,
  descending: boolean,
};

export type View = {
  searching: string,
  sorting: Sorting[],
};

const viewInitial = {
  searching: '',
  sorting: [],
};

export default function (view: View = viewInitial, action: Action): View {
  switch (action.type) {

    case 'SEARCH_RECORDS':
      return Object.assign({}, view, { searching: action.searching });

    case 'SORT_RECORDS':
      // Add current sorting criteria as first element of array.
      // Toggle descending if previous first element has same fieldId.
      // The array can have at most one element for any fieldId.
      return Object.assign({}, view, { sorting: [{
        fieldId: action.fieldId,
        descending: view.sorting.length !== 0 &&
          view.sorting[0].fieldId === action.fieldId &&
          !view.sorting[0].descending,
      }].concat(view.sorting.filter(({ fieldId }) => fieldId !== action.fieldId)) });

    default:
      return view;
  }
}

// Return sorting comparision of field values.
const compareFieldValues = (fieldValueA: FieldValue, fieldValueB: FieldValue, descending: boolean): number => {
  const comparison = typeof fieldValueA === 'number' && typeof fieldValueB === 'number'
    ? fieldValueA - fieldValueB
    : String(fieldValueA).localeCompare(String(fieldValueB));

  return descending ? -comparison : comparison;
};

// Return sorting comparision of records for zero or more fields.
// Assume that the sorting is stable (for example, OrderedMap immutable collection).
const compareRecords = (recordA: Record, recordB: Record, sorting: Sorting[]) : number =>
  sorting.reduce((comparison, { fieldId, descending }) =>
    comparison || // compare field values only if all preceding comparisons are zero
    compareFieldValues(recordA[fieldId], recordB[fieldId], descending),
  0);

// Return whether the record has at least one field which includes the searching string.
const filterRecord = (record: Record, fields: Fields, searching: string): boolean =>
  searching.length === 0 || // not searching
  fields.some(({ id: fieldId }) => record[fieldId].toString().toLowerCase().includes(searching));

// Return records to display in a view, given the sorting and searching critera.
// A record id is its index in the currently stored list of records.
export const inView = (records: RecordsInView, fields: Fields, { searching, sorting }: View): RecordsInView =>
  records
    .filter((record) => filterRecord(record, fields, searching))
    .sort((recordA, recordB) => compareRecords(recordA, recordB, sorting));
