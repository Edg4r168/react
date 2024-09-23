import { fireEvent, getByRole, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import ListOfGif from 'components/ListOfGif/ListOfGif';

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

test('Element <a> is visible after de fetch', async () => {
  render(<App />);
  
  await waitFor(() => {
    const gifLink = document.querySelector('a'); 
    expect(gifLink).toBeVisible();
  });
  
});

test("search form could be used", async () => {
  render(<App />);

  const input = await screen.findByRole("textbox");
  const button = await screen.findByRole("button");

  fireEvent.change(input, { target: { value: "Matrix" }});
  fireEvent.click(button);

  const title = await screen.findByText("Matrix");
  expect(title).toBeVisible();
});
