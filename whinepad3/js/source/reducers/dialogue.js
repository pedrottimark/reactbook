/* @flow */

import type { Action } from '../actions';
import type { RecordId } from './records';

export type Verb = 'create' | 'delete' | 'display' | 'update';
export type Dialogue = {
  verb: Verb,
  recordId?: RecordId, // undefined for create
} | null; // when no dialog box is open

const dialogueInitial = null;

export default function (dialogue: Dialogue = dialogueInitial, action: Action): Dialogue {
  switch (action.type) {

    case 'OPEN_DIALOG':
      return {
        verb: action.verb,
        recordId: action.recordId,
      };

    case 'CANCEL_DIALOG':
    case 'CREATE_RECORD':
    case 'DELETE_RECORD':
    case 'UPDATE_RECORD':
      return dialogueInitial;

    default:
      return dialogue;

  }
}
