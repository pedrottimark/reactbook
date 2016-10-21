/* @flow */

import React, {Component} from 'react';

import Rating from './Rating';
import Suggest from './Suggest';

import type { FieldType, FieldValue } from '../reducers/fields';

export type Props = {
  type: FieldType,
  defaultValue?: FieldValue,
  id?: string,
  options?: Array<string>,
  label?: string,
};

class FormInput extends Component {

  props: Props;

  static defaultProps = {
    type: 'input',
  };

  getValue(): FieldValue {
    return 'value' in this.refs.input
      ? this.refs.input.value
      : this.refs.input.getValue();
  }

  render() {
    const { defaultValue, id, type } = this.props;
    const common: Object = {
      id,
      ref: 'input',
      defaultValue,
    };
    switch (type) {
      case 'year':
        return (
          <input
            {...common}
            type="number"
            defaultValue={defaultValue || new Date().getFullYear()} />
        );
      case 'suggest':
        return <Suggest {...common} options={this.props.options} />;
      case 'rating':
        return (
          <Rating {...common} />
        );
      case 'text':
        return <textarea {...common} />;
      default:
        return <input {...common} type="text" />;
    }
  }
}

export default FormInput
