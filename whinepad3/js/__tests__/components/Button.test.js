import React from 'react';
import TestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer';

import Button from '../../source/components/Button';

// For TestUtils because Button is a functional component.
class Wrap extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

describe('Button with href prop', () => {

  it('renders <a>', () => {
    const tree = renderer.create(
      <Button href="#">Hello</Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Button with no href prop', () => {

  it('renders <button>', () => {
    const tree = renderer.create(
      <Button>Hello</Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('Button', () => {

  it('appends className prop to class attribute', () => {
    const tree = renderer.create(
      <Button className="good bye">Hello</Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders onClick prop as attribute', () => {
    const tree = renderer.create(
      <Button onClick={() => {}}>Hello</Button>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('calls onClick when people click', () => {
    const onClick = jest.fn();
    const component = TestUtils.renderIntoDocument(
      <Wrap><Button onClick={onClick}>Hello</Button></Wrap>
    );
    const button = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
    TestUtils.Simulate.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

});
