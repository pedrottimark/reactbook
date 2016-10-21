import React, { Component } from 'react';

import { connect } from 'react-redux';

import invariant from 'invariant';

import type { Dialogue } from '../reducers/dialogue';
import type { Fields } from '../reducers/fields';
import type { Records } from '../reducers/records';

import Dialog from './Dialog';
import Form from './Form';

import {
  cancelDialog,
  createRecord,
  deleteRecord,
  updateRecord,
} from '../actions';
import type {
  CancelDialog,
  CreateRecord,
  DeleteRecord,
  UpdateRecord,
} from '../actions';

type Props = {
  dialogue: ?Dialogue,
  fields: Fields,
  records: Records,
  cancelDialog: CancelDialog,
  createRecord: CreateRecord,
  deleteRecord: DeleteRecord,
  updateRecord: UpdateRecord,
};

class ModalDialogs extends Component {
  props: Props;

  _refForm(form) {
    this._form = form;
  }
  _form: any; // TODO React element

  _createRecord(confirmed: boolean) {
    if (confirmed) {
      this.props.createRecord(this._form.getData());
    } else {
      this.props.cancelDialog();
    }
  }

  _renderCreateDialog() {
    const { fields } = this.props;
    return (
      <Dialog
          modal={true}
          header="Add new item"
          confirmLabel="Add"
          onAction={this._createRecord.bind(this)}
        >
          <Form ref={this._refForm.bind(this)} fields={fields}/>
        </Dialog>
    );
  }

  _deleteRecord(confirmed: boolean) {
    if (confirmed) {
      const { dialogue } = this.props;
      const recordId = dialogue && dialogue.recordId;
      invariant(typeof recordId === 'number', 'Unexpected delete recordId');
      this.props.deleteRecord(recordId);
    } else {
      this.props.cancelDialog();
    }
  }

  _renderDeleteDialog() {
    const { fields, dialogue, records } = this.props;
    const recordId = dialogue && dialogue.recordId;
    invariant(typeof recordId === 'number', 'Unexpected dialogue state');
    const record = records.get(recordId);
    const nameguess = record[fields[0].id];
    return (
      <Dialog
        modal={true}
        header="Confirm deletion"
        confirmLabel="Delete"
        onAction={this._deleteRecord.bind(this)}
      >
        {`Are you sure you want to delete "${nameguess}"?`}
      </Dialog>
    );
  }

  _updateRecord(confirmed: boolean) {
    if (confirmed) {
      const { dialogue } = this.props;
      const recordId = dialogue && dialogue.recordId;
      invariant(typeof recordId === 'number', 'Unexpected update recordId');
      this.props.updateRecord(recordId, this._form.getData());
    } else {
      this.props.cancelDialog();
    }
  }

  _renderRecordDialog(readonly: boolean) {
    const { dialogue, fields, records } = this.props;
    const recordId = dialogue && dialogue.recordId;
    invariant(typeof recordId === 'number', 'Unexpected dialog state');
    const record = records.get(recordId);
    return (
      <Dialog
        modal={true}
        header={readonly ? 'Item info' : 'Edit item'}
        confirmLabel={readonly ? 'ok' : 'Save'}
        hasCancel={!readonly}
        onAction={this._updateRecord.bind(this)}
      >
        <Form
          ref={this._refForm.bind(this)}
          fields={fields}
          record={record}
          readonly={readonly}
        />
      </Dialog>
    );
  }

  render() {
    const { dialogue } = this.props;
    if (!dialogue) {
      return null;
    }
    switch (dialogue.verb) {

      case 'create':
        return this._renderCreateDialog();

      case 'delete':
        return this._renderDeleteDialog();

      case 'display':
        return this._renderRecordDialog(true);

      case 'update':
        return this._renderRecordDialog(false);

      default:
        throw Error(`Unexpected dialog type ${dialogue.verb}`);
    }
  }
}

// A container component subscribes to relevant parts of state in the Redux store.
const mapStateToProps = ({ dialogue, fields, records }) => ({
  fields,
  dialogue,
  records,
});
const mapDispatchToProps = {
  cancelDialog,
  createRecord,
  deleteRecord,
  updateRecord,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDialogs);
