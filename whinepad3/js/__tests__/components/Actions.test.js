import React from 'react';
import TestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer';

import Actions from '../../source/components/Actions';

// For TestUtils because Actions is a functional component.
class Wrap extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

describe('Actions', () => {

  it('renders <div> containing <span> for each action', () => {
    const tree = renderer.create(
      <Actions />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onAction when people click each <span>', () => {
    const onAction = jest.fn();
    const component = TestUtils.renderIntoDocument(
      <Wrap><Actions onAction={onAction} /></Wrap>
    );

    const spans = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span')
    spans.forEach(span => TestUtils.Simulate.click(span));

    const calls = onAction.mock.calls;
    expect(calls.length).toEqual(spans.length);
    expect(calls[0][0]).toEqual('display');
    expect(calls[1][0]).toEqual('update');
    expect(calls[2][0]).toEqual('delete');
  });

});
