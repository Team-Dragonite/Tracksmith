/**
 * @jest-environment jsdom
 */


 import React from 'react';
 import '@testing-library/jest-dom'
 import renderer from 'react-test-renderer';
 import App from '../app/client/components/App';
 import { MemoryRouter } from 'react-router-dom';
 
 it('renders App', async () => {
   const data = { description: "" }
   const component = renderer.create(
     <MemoryRouter>
       <App /></MemoryRouter>,
   );
   let tree = component.toJSON();
   await expect(tree).toMatchSnapshot();
 });
 