import { render, screen } from "@testing-library/react";
import AccessibleButton from "@/components/AccessibleButton";
import React from "react";

// Mock framer-motion
jest.mock("framer-motion", () => {
  const React = require("react");
  const createMotionComponent = (Component: any) => {
    return React.forwardRef((props: any, ref: any) => {
      return React.createElement(Component, { ...props, ref });
    });
  };

  const motion = Object.assign((Component: any) => createMotionComponent(Component), {
    button: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <button {...props}>{children}</button>
    ),
    a: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <a {...props}>{children}</a>
    ),
  });
  return { motion };
});

describe("AccessibleButton", () => {
  it("renders as a button by default", () => {
    render(<AccessibleButton>Click me</AccessibleButton>);

    const button = screen.getByRole("button", { name: /Click me/i });
    expect(button).toBeInTheDocument();
  });

  it("renders with primary variant by default", () => {
    render(<AccessibleButton>Primary Button</AccessibleButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-accent-lime");
  });

  it("renders with outline variant when specified", () => {
    render(<AccessibleButton variant="outline">Outline Button</AccessibleButton>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("border-accent-lime");
  });

  it("renders with different sizes", () => {
    const { rerender } = render(<AccessibleButton size="sm">Small</AccessibleButton>);
    expect(screen.getByRole("button")).toHaveClass("px-4");

    rerender(<AccessibleButton size="lg">Large</AccessibleButton>);
    expect(screen.getByRole("button")).toHaveClass("px-8");
  });
});
