/* @flow */

import React, {Component} from 'react';

import FormInput from './FormInput';
import Rating from './Rating';

import type { Fields, FieldValue } from '../reducers/fields';

type Props = {
  fields: Fields,
  readonly?: boolean,
  recordId: ?number,
};

class Form extends Component {

  initialData: ?Object;

  constructor(props: Props) {
    super(props);
    if ('record' in this.props) {
      this.initialData = this.props.record;
    }
  }

  getData(): Object {
    let data: Object = {};
    this.props.fields.forEach((field) =>
      data[field.id] = this.refs[field.id].getValue()
    );
    return data;
  }

  render() {
    return (
      <form className="Form">{this.props.fields.map((field) => {
        const prefilled: ?FieldValue = this.initialData && this.initialData[field.id];
        if (!this.props.readonly) {
          return (
            <div className="FormRow" key={field.id}>
              <label className="FormLabel" htmlFor={field.id}>{field.label}:</label>
              <FormInput {...field} ref={field.id} defaultValue={prefilled} />
            </div>
          );
        }
        if (!prefilled) {
          return null;
        }
        return (
          <div className="FormRow" key={field.id}>
            <span className="FormLabel">{field.label}:</span>
            {
              field.type === 'rating'
                ? <Rating readonly={true} defaultValue={parseInt(prefilled, 10)} />
                : <div>{prefilled}</div>
            }
          </div>
        );
      }, this)}</form>
    );
  }
}

export default Form
