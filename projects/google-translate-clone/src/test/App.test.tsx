import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("My App works as espected", async () => {
  const app = render(<App />);

  const user = userEvent.setup();
  const textAreaFrom = app.getByPlaceholderText("Introducir texto");

  await user.type(textAreaFrom, "Hola mundo");
  const result = await app.findByDisplayValue(
    /Traduccion completa/i,
    {},
    { timeout: 2000 }
  );

  expect(result).toBeTruthy();
});
