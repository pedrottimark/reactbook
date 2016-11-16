/* @flow */

import React, { Component } from 'react';

import { connect } from 'react-redux';

import classNames from 'classnames';
import invariant from 'invariant';

import Actions from './Actions';
import FormInput from './FormInput';
import Rating from './Rating';

import {
  openDialog,
  sortRecords,
  updateField,
} from '../actions';
import {
  recordsInView,
} from '../reducers/records';

import type {
  OpenDialog,
  SortRecords,
  UpdateField,
} from '../actions';
import type {
  Verb,
} from '../reducers/dialogue';
import type {
  Fields,
} from '../reducers/fields';
import type {
  RecordsInView,
} from '../reducers/records';
import type {
  View,
} from '../reducers/view';

type Props = {
  fields: Fields,
  records: RecordsInView,
  view: View,
  openDialog: OpenDialog,
  sortRecords: SortRecords,
  updateField: UpdateField,
};

type InputState = {
  recordId: number,
  fieldId: string,
} | null;

type State = {
  input: InputState,
};

class Excel extends Component {
  props: Props;
  state: State;
  constructor() {
    super();
    this.state = {
      input: null, // {recordId, fieldId},
    };
  }

  _refInput(input) {
    this._input = input;
  }
  _input: any; // TODO React element

  _showInput(e: Event) {
    const target = ((e.target: any): HTMLElement);
    this.setState({
      input: {
        recordId: parseInt(target.dataset.recordId, 10),
        fieldId: target.dataset.fieldId,
      },
    });
  }

  _saveInput(e: Event) {
    e.preventDefault();
    const { input } = this.state;
    invariant(input, 'Messed up input state');
    this.props.updateField(
      input.recordId,
      input.fieldId,
      this._input.getValue()
    );
    this.setState({
      input: null,
    });
  }

  _onAction(recordId: number, verb: Verb) {
    this.props.openDialog(verb, recordId);
  }

  render() {
    const { fields, records, view: { sorting } } = this.props;
    const { input } = this.state;
    return (
      <div className="Excel">
        <table>
          <thead>
            <tr>
              {
                fields.filter(({ show }) => !!show).map(({ id: fieldId, label }) => {
                  const indicator = sorting.length !== 0 && sorting[0].fieldId === fieldId
                    ? ` ${sorting[0].descending ? '\u2191' : '\u2193'}`
                    : '';
                  return (
                    <th
                      className={`schema-${fieldId}`}
                      key={fieldId}
                      onClick={this.props.sortRecords.bind(null, fieldId)}
                    >
                      {`${label}${indicator}`}
                    </th>
                  );
                })
              }
              <th className="ExcelNotSortable">Actions</th>
            </tr>
          </thead>
          <tbody onDoubleClick={this._showInput.bind(this)}>
            {
              records.map((record, recordId) => {
                return (
                  <tr key={recordId}>
                    {
                      fields.filter(({ show }) => !!show).map((field) => {
                        const { align, id: fieldId, type } = field;
                        const isRating = type === 'rating';
                        let content = record[fieldId];
                        if (isRating) {
                          content = <Rating readonly={true} defaultValue={Number(content)} />;
                        } else if (input && input.recordId === recordId && input.fieldId === fieldId) {
                          content = (
                            <form onSubmit={this._saveInput.bind(this)}>
                              <FormInput ref={this._refInput.bind(this)} {...field} defaultValue={content} />
                            </form>
                          );
                        }
                        return (
                          <td
                            className={classNames({
                              [`schema-${fieldId}`]: true,
                              'ExcelEditable': !isRating,
                              'ExcelDataLeft': align === 'left',
                              'ExcelDataRight': align === 'right',
                              'ExcelDataCenter': align !== 'left' && align !== 'right',
                            })}
                            key={fieldId}
                            data-record-id={recordId}
                            data-field-id={fieldId}
                          >
                            {content}
                          </td>
                        );
                      })
                    }
                    <td className="ExcelDataCenter">
                      <Actions onAction={this._onAction.bind(this, recordId)} />
                    </td>
                  </tr>
                );
              }).toArray()
            }
          </tbody>
        </table>
      </div>
    );
  }
}

// A container component subscribes to relevant parts of state in the Redux store.
const mapStateToProps = ({ fields, records, view }) => ({
  fields,
  records: recordsInView(records, fields, view),
  view,
});
const mapDispatchToProps = {
  openDialog,
  sortRecords,
  updateField,
};

export default connect(mapStateToProps, mapDispatchToProps)(Excel);
