import { combineReducers } from 'redux';

// child reducers
import dialogue from './dialogue';
import fields from './fields';
import received from './received';
import records from './records';
import view from './view';

// root reducer
export default combineReducers({
  dialogue,
  fields,
  received,
  records,
  view,
});
