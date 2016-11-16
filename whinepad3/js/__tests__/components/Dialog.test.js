import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer';

import Dialog from '../../source/components/Dialog';

describe('Dialog with hasCancel={true} or no hasCancel prop', () => {

  it('renders ok and cancel buttons', () => {
    const tree = renderer.create(
      <Dialog header="ok and Cancel" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders confirmLabel prop as text of the primary button', () => {
    const tree = renderer.create(
      <Dialog header="Add and Cancel" confirmLabel="Add" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('returns true or false when people click the primary or secondary button', () => {
    const callback = jest.fn();
    const component = TestUtils.renderIntoDocument(
      <Dialog header="ok and Cancel" onAction={callback} />
    );
    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithTag(component, 'button')
    );
    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithTag(component, 'span')
    );

    const calls = callback.mock.calls;
    expect(calls.length).toEqual(2);
    expect(calls[0][0]).toEqual(true);
    expect(calls[1][0]).toEqual(false);
  });
});

describe('Dialog with hasCancel={false} prop', () => {

  it('renders only one button', () => {
    const tree = renderer.create(
      <Dialog header="ok" hasCancel={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders confirmLabel prop as text of the button', () => {
    const tree = renderer.create(
      <Dialog header="Close" hasCancel={false} confirmLabel="Close" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('returns false when people click the button', () => {
    const callback = jest.fn();
    const component = TestUtils.renderIntoDocument(
      <Dialog header="Close" hasCancel={false} confirmLabel="Close" onAction={callback} />
    );
    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithTag(component, 'button')
    );

    const calls = callback.mock.calls;
    expect(calls.length).toEqual(1);
    expect(calls[0][0]).toEqual(false);
  });

});

describe('Dialog with modal={true} prop', () => {

  it('adds and removes class to body when it mounts and unmounts', () => {
    const dialog = TestUtils.renderIntoDocument(
      <Dialog header="Modal" modal={true}>Civilized dialog</Dialog>
    );
    expect(Array.from(document.body.classList)).toContain('DialogModalOpen');

    // removing the dialog
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(dialog).parentNode);
    expect(Array.from(document.body.classList)).not.toContain('DialogModalOpen');
  });

});
