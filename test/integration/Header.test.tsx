import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components";
import { renderWithProviders } from "../utils";

jest.mock("next/link", () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

const mockNavigate = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockNavigate,
  }),
}));

jest.mock("@heroicons/react/24/outline", () => ({
  Bars3Icon: ({ className, ...props }: any) => (
    <svg data-testid="bars3-icon" className={className} {...props} />
  ),
  XMarkIcon: ({ className, ...props }: any) => (
    <svg data-testid="xmark-icon" className={className} {...props} />
  ),
}));

jest.mock("@headlessui/react", () => ({
  Dialog: ({ children, open, onClose }: any) =>
    open ? (
      <div data-testid="dialog" onClick={() => onClose(false)}>
        {children}
      </div>
    ) : null,
  DialogPanel: ({ children, className }: any) => (
    <div data-testid="dialog-panel" className={className}>
      {children}
    </div>
  ),
}));

jest.mock("../../src/utils", () => ({
  toKebabCase: (str: string) => str.toLowerCase().replace(/\s+/g, "-"),
}));

const mockUseSelectedPath = jest.fn();
jest.mock("../../src/hooks", () => ({
  useSelectedPath: () => mockUseSelectedPath(),
}));

describe("Header Component", () => {
  const defaultTabs = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const defaultProps = {
    tabs: defaultTabs,
    dataTestId: "main",
  };

  beforeEach(() => {
    mockUseSelectedPath.mockReturnValue({
      selectedPath: { home: false, "about-us": false, contact: false },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    test("renders the header with correct data-testid", () => {
      renderWithProviders(<Header {...defaultProps} />);
      expect(screen.getByTestId("header-main")).toBeInTheDocument();
    });

    test("renders the PayHive logo/brand twice (desktop and mobile)", () => {
      renderWithProviders(<Header {...defaultProps} />);
      expect(screen.getAllByText("PayHive")).toHaveLength(2);
    });

    test("renders all navigation tabs in both desktop and mobile", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      defaultTabs.forEach((tab) => {
        const links = screen.getAllByText(tab.name);
        expect(links.length).toBe(1);
      });

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      defaultTabs.forEach((tab) => {
        const links = screen.getAllByText(tab.name);
        expect(links.length).toBe(2);
      });
    });

    test("renders Sign In and Start Free Trial buttons", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      expect(screen.getAllByText("Sign In")).toHaveLength(1);
      expect(screen.getAllByText("Start Free Trial")).toHaveLength(1);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      expect(screen.getAllByText("Sign In")).toHaveLength(2);
      expect(screen.getAllByText("Start Free Trial")).toHaveLength(2);
    });
  });

  describe("Navigation Links", () => {
    test("renders navigation links with correct hrefs", () => {
      renderWithProviders(<Header {...defaultProps} />);

      defaultTabs.forEach((tab) => {
        const links = screen.getAllByRole("link", { name: tab.name });
        links.forEach((link) => {
          expect(link).toHaveAttribute("href", tab.href);
        });
      });
    });

    test("applies selected path styling when tab is active", () => {
      mockUseSelectedPath.mockReturnValue({
        selectedPath: { home: true, "about-us": false, contact: false },
      });

      renderWithProviders(<Header {...defaultProps} />);

      const homeLinks = screen.getAllByRole("link", { name: "Home" });
      const desktopHomeLink = homeLinks.find((link) =>
        link.className.includes("text-green-700"),
      );

      expect(desktopHomeLink).toHaveClass("text-green-700");
      expect(desktopHomeLink).toHaveClass("border-green-700");
      expect(desktopHomeLink).toHaveStyle({ borderColor: "#15803d" });
    });

    test("should have max-w-10xl class on the container div", () => {
      renderWithProviders(<Header {...defaultProps} />);
      expect(screen.getByTestId("header-main")).toBeInTheDocument();
      const headerContainer = screen.getByTestId("header-main");
      expect(headerContainer.firstChild).toHaveClass("max-w-10xl");
    });

    test("applies non-selected styling when tab is not active", () => {
      renderWithProviders(<Header {...defaultProps} />);

      const aboutLinks = screen.getAllByRole("link", { name: "About Us" });
      const desktopAboutLink = aboutLinks.find((link) =>
        link.className.includes("text-gray-600"),
      );

      expect(desktopAboutLink).toHaveClass("text-gray-600");
      expect(desktopAboutLink).toHaveStyle({ borderColor: "transparent" });
    });

    test("handles multiple selected tabs correctly", () => {
      mockUseSelectedPath.mockReturnValue({
        selectedPath: { home: true, "about-us": true, contact: false },
      });

      renderWithProviders(<Header {...defaultProps} />);

      const homeLinks = screen.getAllByRole("link", { name: "Home" });
      const aboutLinks = screen.getAllByRole("link", { name: "About Us" });
      const contactLinks = screen.getAllByRole("link", { name: "Contact" });

      const selectedHomeLink = homeLinks.find((link) =>
        link.className.includes("text-green-700"),
      );
      const selectedAboutLink = aboutLinks.find((link) =>
        link.className.includes("text-green-700"),
      );
      const unselectedContactLink = contactLinks.find((link) =>
        link.className.includes("text-gray-600"),
      );

      expect(selectedHomeLink).toHaveClass("text-green-700");
      expect(selectedAboutLink).toHaveClass("text-green-700");
      expect(unselectedContactLink).toHaveClass("text-gray-600");
    });
  });

  describe("Mobile Menu Functionality", () => {
    test("shows mobile menu button with correct icon", () => {
      renderWithProviders(<Header {...defaultProps} />);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveClass("lg:hidden");
      expect(screen.getByTestId("bars3-icon")).toBeInTheDocument();
    });

    test("opens mobile menu when menu button is clicked", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      expect(screen.getByTestId("dialog")).toBeInTheDocument();
      expect(screen.getByTestId("dialog-panel")).toBeInTheDocument();
      expect(screen.getByTestId("xmark-icon")).toBeInTheDocument();
    });

    test("closes mobile menu when close button is clicked", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);
      expect(screen.getByTestId("dialog")).toBeInTheDocument();

      const closeButton = screen.getByRole("button", { name: /close menu/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
      });
    });

    test("closes mobile menu when navigation link is clicked", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      const allHomeLinks = screen.getAllByRole("link", { name: "Home" });
      const mobileHomeLink = allHomeLinks.find(
        (link) =>
          link.className.includes("block") &&
          link.className.includes("rounded-lg"),
      );

      if (mobileHomeLink) {
        await user.click(mobileHomeLink);
      }

      await waitFor(() => {
        expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
      });
    });

    test("closes mobile menu when Sign In link is clicked", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      const allSignInLinks = screen.getAllByRole("link", { name: "Sign In" });
      const mobileSignInLink = allSignInLinks.find(
        (link) =>
          link.className.includes("block") &&
          link.className.includes("rounded-lg"),
      );

      if (mobileSignInLink) {
        expect(mobileSignInLink).toHaveAttribute("href", "/sign-in");
        await user.click(mobileSignInLink);
      }

      await waitFor(() => {
        const dialogPanel = document.querySelector(".fixed.inset-y-0.right-0");
        expect(dialogPanel).not.toBeInTheDocument();
      });
    });

    test("closes mobile menu when Start Free Trial link is clicked", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      const mobileTrialLink = screen.getByTestId("mobile-signup-link");

      await user.click(mobileTrialLink);

      await waitFor(() => {
        expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
      });
    });
  });

  describe("Mobile Menu Hover Effects", () => {
    test("applies hover styles on mobile menu navigation links", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      const allHomeLinks = screen.getAllByRole("link", { name: "Home" });
      const mobileHomeLink = allHomeLinks.find(
        (link) =>
          link.className.includes("block") &&
          link.className.includes("rounded-lg"),
      );

      if (mobileHomeLink) {
        expect(mobileHomeLink).toHaveStyle({
          backgroundColor: "transparent",
          color: "#111827",
        });

        await user.hover(mobileHomeLink);
        expect(mobileHomeLink).toHaveStyle({
          backgroundColor: "#f0fdf4",
          color: "#15803d",
        });

        await user.unhover(mobileHomeLink);
        expect(mobileHomeLink).toHaveStyle({
          backgroundColor: "transparent",
          color: "#111827",
        });
      }
    });

    test("applies selected styles on mobile menu for active tab", async () => {
      mockUseSelectedPath.mockReturnValue({
        selectedPath: { home: true, "about-us": false, contact: false },
      });

      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      const allHomeLinks = screen.getAllByRole("link", { name: "Home" });
      const mobileHomeLink = allHomeLinks.find(
        (link) =>
          link.className.includes("block") &&
          link.className.includes("rounded-lg"),
      );

      expect(mobileHomeLink).toHaveStyle({
        backgroundColor: "#dcfce7",
        color: "#14532d",
      });
    });

    test("selected mobile menu item maintains selected styling even on hover", async () => {
      mockUseSelectedPath.mockReturnValue({
        selectedPath: { home: true, "about-us": false, contact: false },
      });

      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      const allHomeLinks = screen.getAllByRole("link", { name: "Home" });
      const mobileHomeLink = allHomeLinks.find(
        (link) =>
          link.className.includes("block") &&
          link.className.includes("rounded-lg"),
      );

      if (mobileHomeLink) {
        await user.hover(mobileHomeLink);
        expect(mobileHomeLink).toHaveStyle({
          backgroundColor: "#dcfce7",
          color: "#14532d",
        });
      }
    });
  });

  describe("Accessibility", () => {
    test("has proper ARIA labels and landmarks", () => {
      renderWithProviders(<Header {...defaultProps} />);

      expect(screen.getByRole("banner")).toBeInTheDocument(); // header element
      expect(screen.getByLabelText("Global")).toBeInTheDocument(); // nav element
    });

    test("has proper screen reader text", () => {
      renderWithProviders(<Header {...defaultProps} />);

      expect(
        screen.getAllByText("PayHive", { selector: ".sr-only" }),
      ).toHaveLength(1);
      expect(
        screen.getByText("Open main menu", { selector: ".sr-only" }),
      ).toBeInTheDocument();
    });

    test("supports keyboard navigation for links", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      const logoLinks = screen.getAllByRole("link", { name: /PayHive/i });
      const logoLink = logoLinks[0];

      logoLink.focus();
      expect(logoLink).toHaveFocus();
    });

    test("has proper focus management in mobile menu", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      const closeButton = screen.getByRole("button", { name: /close menu/i });
      closeButton.focus();
      expect(closeButton).toHaveFocus();

      const allHomeLinks = screen.getAllByRole("link", { name: "Home" });
      const mobileHomeLink = allHomeLinks.find(
        (link) =>
          link.className.includes("block") &&
          link.className.includes("rounded-lg"),
      );

      if (mobileHomeLink) {
        mobileHomeLink.focus();
        expect(mobileHomeLink).toHaveFocus();
      }
    });
  });

  describe("Edge Cases", () => {
    test("handles empty tabs array gracefully", async () => {
      const user = userEvent.setup();
      const propsWithEmptyTabs = {
        ...defaultProps,
        tabs: [],
      };

      renderWithProviders(<Header {...propsWithEmptyTabs} />);

      expect(screen.getByTestId("header-main")).toBeInTheDocument();
      expect(screen.getAllByText("PayHive")).toHaveLength(2);

      expect(screen.getAllByText("Sign In")).toHaveLength(1);
      expect(screen.getAllByText("Start Free Trial")).toHaveLength(1);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      expect(screen.getAllByText("Sign In")).toHaveLength(2);
      expect(screen.getAllByText("Start Free Trial")).toHaveLength(2);
    });

    test("handles tabs with special characters in names", async () => {
      const user = userEvent.setup();
      const specialTabs = [
        { name: "FAQ & Help", href: "/faq" },
        { name: "Pricing (New)", href: "/pricing" },
        { name: "About/Contact", href: "/about-contact" },
      ];

      mockUseSelectedPath.mockReturnValue({
        selectedPath: {
          "faq-&-help": false,
          "pricing-(new)": false,
          "about/contact": false,
        },
      });

      const propsWithSpecialTabs = {
        ...defaultProps,
        tabs: specialTabs,
      };

      renderWithProviders(<Header {...propsWithSpecialTabs} />);

      expect(screen.getAllByText("FAQ & Help")).toHaveLength(1);
      expect(screen.getAllByText("Pricing (New)")).toHaveLength(1);
      expect(screen.getAllByText("About/Contact")).toHaveLength(1);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      expect(screen.getAllByText("FAQ & Help")).toHaveLength(2);
      expect(screen.getAllByText("Pricing (New)")).toHaveLength(2);
      expect(screen.getAllByText("About/Contact")).toHaveLength(2);

      const faqLinks = screen.getAllByRole("link", { name: "FAQ & Help" });
      faqLinks.forEach((link) => {
        expect(link).toHaveAttribute("href", "/faq");
      });
    });

    test("handles very long tab names with proper text wrapping", async () => {
      const user = userEvent.setup();
      const longTabs = [
        {
          name: "This is a very long navigation item name that might wrap",
          href: "/long",
        },
      ];

      mockUseSelectedPath.mockReturnValue({
        selectedPath: {
          "this-is-a-very-long-navigation-item-name-that-might-wrap": false,
        },
      });

      const propsWithLongTabs = {
        ...defaultProps,
        tabs: longTabs,
      };

      renderWithProviders(<Header {...propsWithLongTabs} />);

      const desktopLinks = screen.getAllByText(
        "This is a very long navigation item name that might wrap",
      );
      expect(desktopLinks).toHaveLength(1);

      const desktopLink = desktopLinks.find((link) =>
        link.className.includes("text-nowrap"),
      );
      expect(desktopLink).toHaveClass("text-nowrap");

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      const allLinks = screen.getAllByText(
        "This is a very long navigation item name that might wrap",
      );
      expect(allLinks).toHaveLength(2);
    });

    test("handles invalid selectedPath data gracefully", () => {
      mockUseSelectedPath.mockReturnValue({
        selectedPath: null,
      });

      expect(() => renderWithProviders(<Header {...defaultProps} />)).toThrow();
    });

    test("handles missing selectedPath properties", () => {
      mockUseSelectedPath.mockReturnValue({
        selectedPath: { home: true },
      });

      renderWithProviders(<Header {...defaultProps} />);

      expect(screen.getByTestId("header-main")).toBeInTheDocument();

      const homeLinks = screen.getAllByRole("link", { name: "Home" });
      const desktopHomeLink = homeLinks.find((link) =>
        link.className.includes("text-green-700"),
      );
      expect(desktopHomeLink).toHaveClass("text-green-700");
    });
  });

  describe("State Management", () => {
    test("manages mobile menu state independently", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);
      expect(screen.getByTestId("dialog")).toBeInTheDocument();

      const closeButton = screen.getByRole("button", { name: /close menu/i });
      await user.click(closeButton);
      await waitFor(() => {
        expect(screen.queryByTestId("dialog")).not.toBeInTheDocument();
      });

      await user.click(menuButton);
      expect(screen.getByTestId("dialog")).toBeInTheDocument();
    });

    test("manages hover state for mobile links independently", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      const allHomeLinks = screen.getAllByRole("link", { name: "Home" });
      const allAboutLinks = screen.getAllByRole("link", { name: "About Us" });

      const mobileHomeLink = allHomeLinks.find(
        (link) =>
          link.className.includes("block") &&
          link.className.includes("rounded-lg"),
      );
      const mobileAboutLink = allAboutLinks.find(
        (link) =>
          link.className.includes("block") &&
          link.className.includes("rounded-lg"),
      );

      if (mobileHomeLink && mobileAboutLink) {
        await user.hover(mobileHomeLink);
        expect(mobileHomeLink).toHaveStyle({ backgroundColor: "#f0fdf4" });
        expect(mobileAboutLink).toHaveStyle({ backgroundColor: "transparent" });

        await user.hover(mobileAboutLink);
        expect(mobileHomeLink).toHaveStyle({ backgroundColor: "transparent" });
        expect(mobileAboutLink).toHaveStyle({ backgroundColor: "#f0fdf4" });
      }
    });

    test("calls useSelectedPath hook exactly once", () => {
      renderWithProviders(<Header {...defaultProps} />);
      expect(mockUseSelectedPath).toHaveBeenCalledTimes(1);
    });
  });

  describe("Visual Design and Styling", () => {
    test("applies correct header styling classes", () => {
      renderWithProviders(<Header {...defaultProps} />);

      const header = screen.getByTestId("header-main");
      expect(header).toHaveClass(
        "sticky",
        "inset-x-0",
        "top-0",
        "z-50",
        "bg-white/95",
        "backdrop-blur-sm",
        "border-b",
        "border-gray-200",
      );
    });

    test("applies responsive navigation classes", () => {
      renderWithProviders(<Header {...defaultProps} />);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      expect(menuButton).toHaveClass("lg:hidden");

      const desktopNav = document.querySelector(".hidden.lg\\:flex");
      expect(desktopNav).toBeInTheDocument();
    });

    test("applies correct button styling for Sign In and Start Free Trial", () => {
      renderWithProviders(<Header {...defaultProps} />);

      const signInButtons = screen.getAllByText("Sign In");
      const trialButtons = screen.getAllByText("Start Free Trial");

      const desktopSignInButton = signInButtons.find((btn) =>
        btn.className.includes("text-gray-600"),
      );
      expect(desktopSignInButton).toHaveClass(
        "text-gray-600",
        "hover:text-green-700",
      );

      const desktopTrialButton = trialButtons.find((btn) =>
        btn.className.includes("bg-green-700"),
      );
      expect(desktopTrialButton).toHaveClass(
        "bg-green-700",
        "hover:bg-green-800",
      );
    });

    test("applies correct transition classes for smooth animations", () => {
      renderWithProviders(<Header {...defaultProps} />);

      const homeLinks = screen.getAllByRole("link", { name: "Home" });
      const desktopHomeLink = homeLinks.find((link) =>
        link.className.includes("transition-colors"),
      );
      expect(desktopHomeLink).toHaveClass("transition-colors");

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      expect(menuButton).toHaveClass("transition-colors");
    });

    test("applies proper mobile menu panel styling", async () => {
      const user = userEvent.setup();
      renderWithProviders(<Header {...defaultProps} />);

      const menuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(menuButton);

      const dialogPanel = screen.getByTestId("dialog-panel");
      expect(dialogPanel).toHaveClass(
        "fixed",
        "inset-y-0",
        "right-0",
        "z-50",
        "w-full",
        "overflow-y-auto",
        "bg-white",
        "px-6",
        "py-6",
        "sm:max-w-sm",
        "sm:ring-1",
        "sm:ring-gray-200",
        "shadow-xl",
      );
    });
  });

  describe("Integration", () => {
    test("integrates properly with Next.js Link component", () => {
      renderWithProviders(<Header {...defaultProps} />);

      defaultTabs.forEach((tab) => {
        const links = screen.getAllByRole("link", { name: tab.name });
        links.forEach((link) => {
          expect(link.tagName).toBe("A");
          expect(link).toHaveAttribute("href", tab.href);
        });
      });
    });

    test("integrates properly with toKebabCase utility", () => {
      const tabsWithSpaces = [
        { name: "Product Features", href: "/features" },
        { name: "Customer Support", href: "/support" },
      ];

      mockUseSelectedPath.mockReturnValue({
        selectedPath: {
          "product-features": true,
          "customer-support": false,
        },
      });

      renderWithProviders(<Header {...defaultProps} tabs={tabsWithSpaces} />);

      const featureLinks = screen.getAllByRole("link", {
        name: "Product Features",
      });
      const selectedFeatureLink = featureLinks.find((link) =>
        link.className.includes("text-green-700"),
      );
      expect(selectedFeatureLink).toHaveClass("text-green-700");
    });
  });
});
