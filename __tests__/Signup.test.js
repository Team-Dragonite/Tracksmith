/**
 * @jest-environment jsdom
 */

 import React from 'react';
 import '@testing-library/jest-dom'
 import renderer from 'react-test-renderer';
 import SignUp from '../app/client/components/SignUpPage';
 import { render, screen } from '@testing-library/react';
 import { MemoryRouter } from 'react-router-dom';
 
 it('renders SignUp snapshot', async () => {
   const component = renderer.create(
     <MemoryRouter>
       <SignUp /></MemoryRouter>,
   );
   let tree = component.toJSON();
   await expect(tree).toMatchSnapshot();
 });
 
 it('renders SignUp', async () => {
  render(<SignUp />)
  await expect(screen.getByRole('heading')).toBeInTheDocument();
});