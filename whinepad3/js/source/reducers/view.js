import type { Action } from '../actions';
import type { FieldId } from './fields';

type Sort = {
  fieldId: FieldId,
  descending: boolean;
};

export type View = {
  search: string,
  sort: Sort[],
};

const viewInitial = {
  search: '',
  sort: [],
};

export default function (view: View = viewInitial, action: Action): View {
  switch (action.type) {

    case 'SEARCH_RECORDS':
      return Object.assign({}, view, { search: action.search });

    case 'SORT_RECORDS':
      // Add current sorting criteria as first element of array.
      // Toggle descending if previous first element has same fieldId.
      // The array can have at most one element for any fieldId.
      return Object.assign({}, view, { sort: [{
        fieldId: action.fieldId,
        descending: view.sort.length !== 0 && view.sort[0].fieldId === action.fieldId && !view.sort[0].descending,
      }].concat(view.sort.filter(({ fieldId }) => fieldId !== action.fieldId)) });

    default:
      return view;
  }
}
