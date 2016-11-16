import React from 'react';
import TestUtils from 'react-addons-test-utils';
import renderer from 'react-test-renderer';

import FormInput from '../../source/components/FormInput';

describe('FormInput with no type prop', () => {

  it('renders <input type="text" />', () => {
    const tree = renderer.create(
      <FormInput />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders <input type="text" /> with defaultValue', () => {
    const tree = renderer.create(
      <FormInput defaultValue="default value" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('returns defaultValue or changed value', () => {
    const defaultValue = 'default value';
    const otherValue = 'other value';
    const component = TestUtils.renderIntoDocument(
      <FormInput defaultValue={defaultValue} />
    );
    expect(component.getValue()).toEqual(defaultValue);
    const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
    input.value = otherValue;
    expect(component.getValue()).toEqual(otherValue);
  });

});

describe('FormInput with type="year" prop', () => {

  it('renders <input type="number" />', () => {
    const tree = renderer.create(
      <FormInput type="year" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders <input type="number" /> with defaultValue', () => {
    const tree = renderer.create(
      <FormInput type="year" defaultValue={2016} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('returns defaultValue or changed value', () => {
    const defaultValue = 2016;
    const otherValue = 2015;
    const component = TestUtils.renderIntoDocument(
      <FormInput type="year" defaultValue={defaultValue} />
    );
    expect(component.getValue()).toEqual(defaultValue);
    const input = TestUtils.findRenderedDOMComponentWithTag(component, 'input');
    input.value = otherValue;
    expect(component.getValue()).toEqual(otherValue);
  });

});

describe('FormInput with type="suggest" prop', () => {

  it('renders <div> containing <input /> and <datalist>', () => {
    const tree = renderer.create(
      <FormInput type="suggest" id="color" options={['r', 'g', 'b']} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders <div> containing <input /> and <datalist> with defaultValue', () => {
    const tree = renderer.create(
      <FormInput type="suggest" id="color" options={['r', 'g', 'b']} defaultValue="g" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('FormInput with type="rating" prop', () => {

  it('renders <div> containing <span> for each star and <input type="hidden" />', () => {
    const tree = renderer.create(
      <FormInput type="rating" id="rating" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('returns defaultValue prop of FormInput with type="rating"', () => {
    const tree = renderer.create(
      <FormInput type="rating" id="rating" defaultValue={3} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});

describe('FormInput with type="text" prop', () => {

  it('renders <textarea />', () => {
    const tree = renderer.create(
      <FormInput type="text" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders <textarea /> with defaultValue', () => {
    const defaultValue = `default
value`;
    const tree = renderer.create(
      <FormInput type="text" defaultValue={defaultValue} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('returns defaultValue or changed value', () => {
    const defaultValue = `default
value`;
    const otherValue = `other
value`;
    const component = TestUtils.renderIntoDocument(
      <FormInput type="text" defaultValue={defaultValue} />
    );
    expect(component.getValue()).toEqual(defaultValue);
    const textarea = TestUtils.findRenderedDOMComponentWithTag(component, 'textarea');
    textarea.value = otherValue;
    expect(component.getValue()).toEqual(otherValue);
  });

});
