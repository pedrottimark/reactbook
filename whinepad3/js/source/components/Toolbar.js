import React, {Component} from 'react';

import { connect } from 'react-redux';

import Button from './Button';

import {
  openDialog,
  searchRecords,
} from '../actions';
import type {
  OpenDialog,
  SearchRecords,
} from '../actions';

type Props = {
  count: number,
  openDialog: OpenDialog,
  searchRecords: SearchRecords,
};

class Toolbar extends Component {
  props: Props;

  _searchRecords(e: Event) {
    const target = ((e.target: any): HTMLInputElement);
    this.props.searchRecords(target.value.toLowerCase());
  }

  render() {
    const { count } = this.props;
    return (
      <div className="WhinepadToolbar">
        <div className="WhinepadToolbarAdd">
          <Button
            onClick={this.props.openDialog.bind(null, 'create')}
            className="WhinepadToolbarAddButton">
            + add
          </Button>
        </div>
        <div className="WhinepadToolbarSearch">
          <input
            placeholder={count === 1
              ? 'Search 1 record...'
              : `Search ${count} records...`
            }
            onChange={this._searchRecords.bind(this)}
          />
        </div>
      </div>
    );
  }
}

// A container component subscribes to relevant parts of state in the Redux store.
const mapStateToProps = ({ records }) => ({
  count: records.count(),
});
const mapDispatchToProps = {
  openDialog,
  searchRecords,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
