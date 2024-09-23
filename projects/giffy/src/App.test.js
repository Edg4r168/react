import { render, screen } from '@testing-library/react';
import App from './App';

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

test('renders without crashing', async () => {
  render(<App />);
  const title = await screen.findByText(/Ultima busqueda/i);
  expect(title).toBeInTheDocument();
});
