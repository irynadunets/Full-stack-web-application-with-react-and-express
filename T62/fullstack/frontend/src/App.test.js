import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

it('should render App component', () => {
    const elem = renderer.create( < App / > ).toJSON();
    expect(elem).toMatchSnapshot();
});