import { render, screen } from "@testing-library/react";
import Navigation from "@/components/Navigation";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <div {...props}>{children}</div>
    ),
    nav: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <nav {...props}>{children}</nav>
    ),
    header: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <header {...props}>{children}</header>
    ),
    li: ({ children, ...props }: React.PropsWithChildren<object>) => (
      <li {...props}>{children}</li>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Navigation", () => {
  it("renders the logo", () => {
    render(<Navigation />);
    
    const logoLinks = screen.getAllByLabelText(/Susan Chapas - Home/i);
    expect(logoLinks.length).toBeGreaterThan(0);
  });

  it("contains navigation links", () => {
    render(<Navigation />);
    
    expect(screen.getAllByText(/Home/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/About/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Projects/i).length).toBeGreaterThan(0);
  });

  it("has accessible mobile menu button", () => {
    render(<Navigation />);
    
    const menuButton = screen.getByRole("button", { name: /Open menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it("has social media links with accessible labels", () => {
    render(<Navigation />);
    
    const linkedinLinks = screen.getAllByLabelText(/LinkedIn profile/i);
    const githubLinks = screen.getAllByLabelText(/GitHub profile/i);
    
    expect(linkedinLinks.length).toBeGreaterThan(0);
    expect(githubLinks.length).toBeGreaterThan(0);
  });
});
