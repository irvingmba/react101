import { jest } from "@jest/globals";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import testData from "../../__test-utils__/Data/TestData";
import Gallery from "./Gallery";

describe("Testing gallery component", () => {
  afterEach(cleanup);

  test("Rendering without props", () => {
    const { container } = render(<Gallery />);
    const ul = container.querySelector("ul");
    expect(ul).toBeInTheDocument();
    const li = container.querySelector("li");
    expect(li).not.toBeInTheDocument();
  });

  test("Rendering with images", () => {
    const { container } = render(<Gallery data={testData} />);
    const ul = container.querySelector("ul");
    expect(ul).toBeInTheDocument();
    const li = container.querySelector("li");
    expect(li).toBeInTheDocument();
  });

  test("When passing text, it will render previous and next buttons", () => {
    const text1 = "previous";
    render(<Gallery prevBtn={text1} />);
    expect(screen.getByRole("button", { name: text1 })).toBeDefined();
    const text2 = "next";
    cleanup();
    render(<Gallery nextBtn={text2} />);
    expect(screen.getByRole("button", { name: text2 })).toBeDefined();
    cleanup();
    render(<Gallery prevBtn={text1} nextBtn={text2} />);
    const prevBtn = screen.getByRole("button", { name: text1 });
    const nextBtn = screen.getByRole("button", { name: text2 });
    expect(prevBtn).toBeDefined();
    expect(nextBtn).toBeDefined();
  });

});
