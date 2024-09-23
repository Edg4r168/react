import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { Router } from "./Router";
import { Route } from "./Route";
import { getCurrentPath } from "./utils";

vi.mock("./utils.js", () => ({
  getCurrentPath: vi.fn(),
}));

describe("Router", () => {
  // Limpiar la pantalla cada vez que se ejecuten los test
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("Should render without problems", () => {
    render(<Router routes={[]} />);
    expect(true).toBeTruthy();
  });

  it("Should 404 if no routes match", () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />);

    expect(screen.getByText("404")).toBeTruthy();
  });

  it("Should render the component of the first route that matches", () => {
    getCurrentPath.mockReturnValue("/");
    const routes = [
      {
        path: "/",
        Component: <h1>Home</h1>,
      },
      {
        path: "/about",
        Component: <h1>About</h1>,
      },
    ];

    render(<Router routes={routes} />);

    expect(screen.getByText("Home")).toBeTruthy();
  });

  it("Should navigate using Links", () => {
    getCurrentPath.mockReturnValue("/");

        render(
            <Router>
                <Route path="/" Component={() => (
                    <>
                        <h1>Home</h1>
                        <LinK
                    </>
                )} />
            </Router>
        )
  })
});
