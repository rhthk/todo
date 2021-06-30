import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { TodoTile } from "./todo";
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("Todo Component test", () => {
  act(() => {
    render(<TodoTile title="123" />, container);
  });
  expect(container.textContent).toBe("<123-");
  act(() => {
    render(<TodoTile title="123" isDone="true" />, container);
  });
  expect(container.textContent).toBe(">123-");
});
