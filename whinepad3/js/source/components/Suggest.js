/* @flow */

import React, {Component} from 'react';

type Props = {
  id: string,
  defaultValue?: string,
  options: Array<string>,
};

type State = {
  value: string,
};

class Suggest extends Component {

  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {value: props.defaultValue || ''};
  }

  getValue(): string {
    return this.state.value;
  }

  render() {
    return (
      <div>
        <input
          list={this.props.id}
          defaultValue={this.props.defaultValue}
          onChange={e => this.setState({value: e.target.value})}
        />
        <datalist id={this.props.id}>{
          this.props.options.map((item: string, idx: number) =>
            <option value={item} key={idx} />
          )
        }</datalist>
      </div>
    );
  }
}

export default Suggest
