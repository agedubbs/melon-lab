import React from 'react';
import Header from './index';

describe('Header', () => {
  const defaultElement = <Header />;

  it('should render correctly', () => {
    const wrapper = shallow(defaultElement);
    expect(wrapper).toMatchSnapshot();
  });
});
