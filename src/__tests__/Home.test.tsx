import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <div {...props}>{children}</div>
    ),
    section: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <section {...props}>{children}</section>
    ),
    p: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <p {...props}>{children}</p>
    ),
    h1: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <h1 {...props}>{children}</h1>
    ),
    a: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <a {...props}>{children}</a>
    ),
    article: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <article {...props}>{children}</article>
    ),
  },
  useScroll: () => ({ scrollYProgress: { current: 0 } }),
  useTransform: () => 0,
  useReducedMotion: () => false,
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Home Page", () => {
  it("renders the hero section", () => {
    render(<Home />);

    expect(screen.getByText(/I build strategies/i)).toBeInTheDocument();
    expect(screen.getByText(/that drive engagement/i)).toBeInTheDocument();
  });

  it("renders the selected work section", () => {
    render(<Home />);

    expect(screen.getByText(/Selected Work/i)).toBeInTheDocument();
  });

  it("has accessible navigation links", () => {
    render(<Home />);

    const viewWorkLink = screen.getByRole("link", { name: /View My Work/i });
    expect(viewWorkLink).toBeInTheDocument();
  });
});
