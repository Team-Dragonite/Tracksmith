/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom'
import renderer from 'react-test-renderer';
import ConversionRates from '../app/client/components/ConversionRate';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../app/client/store/store';

it('renders ConversionRates snapshot', async () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <ConversionRates />
      </MemoryRouter>
    </Provider>,
  );
  let tree = component.toJSON();
  await expect(tree).toMatchSnapshot();
});

it('renders ConversionRates', async () => {
  render(
    <Provider store={store}>
      <HashRouter>
        <ConversionRates />
      </HashRouter>
    </Provider>
  )
  await expect(screen.getByRole('button')).toBeInTheDocument();
});