import type { Action } from '../actions';

export type FieldId = string;
export type FieldValue = string | number;
export type FieldType = 'year' | 'suggest' | 'rating' | 'text' | 'input';
export type Field = {
  id: FieldId,
  label: string,
  type: FieldType, // TODO required?
  show: boolean,
  sample: FieldValue,
  align?: 'left' | 'center' | 'right',
};
export type Fields = Field[];

const fieldsInitial = [];

export default function (fields: Fields = fieldsInitial, action: Action): Fields {
  switch (action.type) {

    case 'RECEIVE_DATA':
      return action.fields;

    default:
      return fields;

  }
}
