import type { Action } from '../actions';

const receivedInitial = false;

export default function (received: boolean = receivedInitial, action: Action): boolean {
  switch (action.type) {

    case 'RECEIVE_DATA':
      return true;

    default:
      return received;

  }
}
