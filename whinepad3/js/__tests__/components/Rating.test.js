import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Rating from '../../source/components/Rating';

describe('Rating', () => {

  it('handles mouseOver, mouseOut, click', () => {
    const component = TestUtils.renderIntoDocument(
      <Rating />
    );
    const stars = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
    const defaultValue = 0;
    const defaultIndex = defaultValue - 1; // zero-based
    const otherValue = 4;
    const otherIndex = otherValue - 1; // zero-based

    TestUtils.Simulate.mouseOver(stars[otherIndex]);
    stars.forEach((star, index) => expect(star.className).toBe(
      index <= otherIndex ? 'RatingOn' : ''
    ));
    expect(component.getValue()).toBe(defaultValue);
    expect(component.state.rating).toBe(defaultValue);
    expect(component.state.tmpRating).toBe(otherValue);

    TestUtils.Simulate.mouseOut(stars[otherIndex]);
    stars.forEach((star, index) => expect(star.className).toBe(
      index <= defaultIndex ? 'RatingOn' : ''
    ));
    expect(component.getValue()).toBe(defaultValue);
    expect(component.state.rating).toBe(defaultValue);
    expect(component.state.tmpRating).toBe(defaultValue);

    TestUtils.Simulate.click(stars[otherIndex]);
    stars.forEach((star, index) => expect(star.className).toBe(
      index <= otherIndex ? 'RatingOn' : ''
    ));
    expect(component.getValue()).toBe(otherValue);
    expect(component.state.rating).toBe(otherValue);
    expect(component.state.tmpRating).toBe(otherValue);
  });

});

describe('Rating with readonly prop', () => {

  it('ignores mouseOver, mouseOut, click', () => {
    const component = TestUtils.renderIntoDocument(
      <Rating readonly={true} />
    );
    const stars = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
    const defaultValue = 0;
    const defaultIndex = defaultValue - 1; // zero-based
    const otherValue = 4;
    const otherIndex = otherValue - 1; // zero-based

    TestUtils.Simulate.mouseOver(stars[otherIndex]);
    stars.forEach((star, index) => expect(star.className).toBe(
      index <= defaultIndex ? 'RatingOn' : ''
    ));
    expect(component.getValue()).toBe(defaultValue);
    expect(component.state.rating).toBe(defaultValue);
    expect(component.state.tmpRating).toBe(defaultValue);

    TestUtils.Simulate.mouseOut(stars[otherIndex]);
    stars.forEach((star, index) => expect(star.className).toBe(
      index <= defaultIndex ? 'RatingOn' : ''
    ));
    expect(component.getValue()).toBe(defaultValue);
    expect(component.state.rating).toBe(defaultValue);
    expect(component.state.tmpRating).toBe(defaultValue);

    TestUtils.Simulate.click(stars[otherIndex]);
    stars.forEach((star, index) => expect(star.className).toBe(
      index <= defaultIndex ? 'RatingOn' : ''
    ));
    expect(component.getValue()).toBe(defaultValue);
    expect(component.state.rating).toBe(defaultValue);
    expect(component.state.tmpRating).toBe(defaultValue);
  });

});
