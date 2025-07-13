import { render, screen } from "@testing-library/react";
import PricingPage from "@/app/pricing/page";

describe("Pricing Component", () => {
  beforeEach(() => {
    render(<PricingPage />);
  });

  describe("Accessibility", () => {
    test("should have proper heading structure", () => {
      const mainHeading = screen.getByRole("heading", { level: 2 });
      expect(mainHeading).toBeInTheDocument();

      const tierHeadings = screen.getAllByRole("heading", { level: 3 });
      expect(tierHeadings).toHaveLength(3); // One for each tier in mobile view
    });

    test("should have proper table structure for desktop view", () => {
      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();

      const caption = screen.getByText("Pricing plan comparison");
      expect(caption).toBeInTheDocument();
      expect(caption).toHaveClass("sr-only");
    });

    test("should have proper column headers in table", () => {
      const columnHeaders = screen.getAllByRole("columnheader");
      expect(columnHeaders.length).toBeGreaterThan(0);

      // Check tier names are properly marked as column headers
      expect(
        screen.getByRole("columnheader", { name: "Starter" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("columnheader", { name: "Growth" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("columnheader", { name: "Scale" }),
      ).toBeInTheDocument();
    });

    test("should have proper row headers for feature sections", () => {
      const rowHeaders = screen.getAllByRole("rowheader");
      expect(rowHeaders.length).toBeGreaterThan(0);
    });

    test("should have accessible links with proper aria-describedby in mobile view", () => {
      const mobileContainer = screen
        .getByRole("main")
        .querySelector(".lg\\:hidden");
      const mobileBuyPlanLinks =
        mobileContainer?.querySelectorAll('a[href="#"]') || [];

      Array.from(mobileBuyPlanLinks).forEach((link) => {
        expect(link).toHaveAttribute("aria-describedby");
        expect(link).toHaveAttribute("href", "#");

        // Verify the aria-describedby points to a valid tier ID
        const describedBy = link.getAttribute("aria-describedby");
        expect(describedBy).toMatch(/tier-(starter|growth|scale)/);
      });
    });

    test("should have screen reader only text for pricing context", () => {
      const srOnlyPrice = screen.getByText("Price");
      expect(srOnlyPrice).toHaveClass("sr-only");
    });

    test("should have proper aria-hidden attributes on icons", () => {
      const table = screen.getByRole("table");
      const icons = table.querySelectorAll('svg[aria-hidden="true"]');

      icons.forEach((icon) => {
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });
    });

    test("should have screen reader text for feature availability", () => {
      const srTexts = screen.getAllByText(/included|not included/i);
      srTexts.forEach((text) => {
        expect(text).toHaveClass("sr-only");
      });
    });

    test("should have proper list structure for mobile view", () => {
      const lists = screen.getAllByRole("list");
      expect(lists.length).toBeGreaterThan(0);
    });

    test("should have proper colgroup and col elements for table layout", () => {
      const table = screen.getByRole("table");
      const colgroup = table.querySelector("colgroup");
      expect(colgroup).toBeInTheDocument();

      const cols = table.querySelectorAll("col");
      expect(cols).toHaveLength(4); // One for each column
    });
  });

  describe("Styling and Layout", () => {
    test("should apply correct responsive classes to main container", () => {
      const main = screen.getByRole("main");
      expect(main).toHaveClass("bg-white", "px-6", "py-8");
    });

    test("should apply correct container classes", () => {
      const container = screen.getByRole("main").firstChild;
      expect(container).toHaveClass("mx-auto", "max-w-7xl", "px-6", "lg:px-8");
    });

    test("should apply correct text styling to main heading", () => {
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveClass(
        "text-base/7",
        "font-semibold",
        "text-green-600",
      );
    });

    test("should apply correct styling to price text", () => {
      const priceElements = screen.getAllByText(/£\d+/);
      priceElements.forEach((price) => {
        expect(price).toHaveClass("text-4xl", "font-semibold");
      });
    });

    test("should apply mostPopular styling correctly", () => {
      // Growth tier should be most popular - find it by heading
      const growthHeading = screen
        .getAllByText("Growth")
        .find((el) => el.tagName === "H3");
      const growthSection = growthHeading?.closest("section");

      if (growthSection) {
        expect(growthSection).toHaveClass(
          "rounded-xl",
          "bg-gray-400/5",
          "ring-1",
          "ring-inset",
          "ring-gray-200",
        );
      }
    });

    test("should apply correct button styling for most popular tier", () => {
      const buyPlanLinks = screen.getAllByRole("link", { name: /buy plan/i });

      // Find the Growth tier button (most popular)
      const growthButton = buyPlanLinks.find(
        (link) => link.getAttribute("aria-describedby") === "tier-growth",
      );

      if (growthButton) {
        expect(growthButton).toHaveClass(
          "bg-green-600",
          "text-white",
          "hover:bg-green-500",
        );
      }
    });

    test("should apply correct button styling for non-popular tiers", () => {
      const buyPlanLinks = screen.getAllByRole("link", { name: /buy plan/i });

      // Find non-popular tier buttons (Starter and Scale)
      const nonPopularButtons = buyPlanLinks.filter((link) => {
        const describedBy = link.getAttribute("aria-describedby");
        return describedBy === "tier-starter" || describedBy === "tier-scale";
      });

      expect(nonPopularButtons.length).toBeGreaterThan(0);

      nonPopularButtons.forEach((button) => {
        expect(button).toHaveClass("text-green-600");
        expect(button).toHaveClass("ring-1");
        expect(button).toHaveClass("ring-inset");
        expect(button).toHaveClass("ring-green-200");
        expect(button).toHaveClass("hover:ring-green-300");
      });
    });

    test("should apply correct mobile view classes", () => {
      const mobileContainer = screen
        .getByRole("main")
        .querySelector(".lg\\:hidden");
      expect(mobileContainer).toHaveClass(
        "mx-auto",
        "mt-12",
        "max-w-md",
        "space-y-8",
        "sm:mt-16",
        "lg:hidden",
      );
    });

    test("should apply correct desktop table classes", () => {
      const desktopContainer = screen
        .getByRole("main")
        .querySelector(".hidden.lg\\:block");
      expect(desktopContainer).toHaveClass(
        "isolate",
        "mt-20",
        "hidden",
        "lg:block",
      );
    });

    test("should apply correct table styling", () => {
      const table = screen.getByRole("table");
      expect(table).toHaveClass(
        "w-full",
        "table-fixed",
        "border-separate",
        "border-spacing-x-8",
        "text-left",
      );
    });

    test("should apply correct column width classes", () => {
      const table = screen.getByRole("table");
      const cols = table.querySelectorAll("col");

      cols.forEach((col) => {
        expect(col).toHaveClass("w-1/4");
      });
    });

    test("should apply correct icon styling", () => {
      const table = screen.getByRole("table");

      // Check for green icons (CheckIcon) - these should have text-green-600
      const greenIcons = table.querySelectorAll("svg.text-green-600");
      expect(greenIcons.length).toBeGreaterThan(0);

      // Check for gray icons (MinusIcon) - these should have text-gray-400
      const grayIcons = table.querySelectorAll("svg.text-gray-400");
      expect(grayIcons.length).toBeGreaterThan(0);

      // Verify sizing classes
      const sizedIcons = table.querySelectorAll(
        "svg.mx-auto.size-5, svg.h-6.w-5",
      );
      expect(sizedIcons.length).toBeGreaterThan(0);
    });

    test("should apply correct focus styles to buttons", () => {
      const buyPlanLinks = screen.getAllByRole("link", { name: /buy plan/i });

      buyPlanLinks.forEach((link) => {
        expect(link).toHaveClass(
          "focus-visible:outline",
          "focus-visible:outline-2",
          "focus-visible:outline-offset-2",
          "focus-visible:outline-green-600",
        );
      });
    });

    test("should apply correct spacing and padding classes", () => {
      const mobileContainer = screen
        .getByRole("main")
        .querySelector(".lg\\:hidden");
      const tierSections = mobileContainer?.querySelectorAll("section");

      if (tierSections && tierSections.length > 0) {
        Array.from(tierSections).forEach((section) => {
          expect(section).toHaveClass("p-8");
        });
      }
    });

    test("should have correct responsive text sizing", () => {
      const mainTitle = screen.getByText(/pricing that grows with you/i);
      expect(mainTitle).toHaveClass("text-5xl", "sm:text-6xl");
    });

    test("should apply correct background highlight for most popular tier in desktop view", () => {
      const table = screen.getByRole("table");
      const highlightDiv = table.querySelector(".bg-gray-400\\/5");

      if (highlightDiv) {
        expect(highlightDiv).toHaveClass(
          "w-full",
          "rounded-t-xl",
          "border-x",
          "border-t",
          "border-gray-900/10",
        );
      }
    });
  });

  describe("Content Structure", () => {
    test("should render all three pricing tiers", () => {
      expect(screen.getAllByText("Starter")).toHaveLength(2); // Mobile + Desktop
      expect(screen.getAllByText("Growth")).toHaveLength(2); // Mobile + Desktop
      expect(screen.getAllByText("Scale")).toHaveLength(2); // Mobile + Desktop
    });

    test("should render all feature sections", () => {
      expect(screen.getByText("Features")).toBeInTheDocument();
      expect(screen.getByText("Reporting")).toBeInTheDocument();
      expect(screen.getByText("Support")).toBeInTheDocument();
    });

    test("should render correct number of buy plan links", () => {
      const buyPlanLinks = screen.getAllByRole("link", { name: /buy plan/i });
      expect(buyPlanLinks).toHaveLength(6); // 3 for mobile + 3 for desktop
    });

    test("should have proper tier identification", () => {
      const tierElements = screen.getAllByRole("heading", { level: 3 });
      tierElements.forEach((tier) => {
        expect(tier).toHaveAttribute("id");
        expect(tier.id).toMatch(/tier-/);
      });
    });

    test("should render pricing information for each tier", () => {
      expect(screen.getAllByText("£19")).toHaveLength(2); // Starter price
      expect(screen.getAllByText("£49")).toHaveLength(2); // Growth price
      expect(screen.getAllByText("£99")).toHaveLength(2); // Scale price
    });

    test("should have mobile and desktop views with proper visibility classes", () => {
      const mobileView = screen.getByRole("main").querySelector(".lg\\:hidden");
      const desktopView = screen
        .getByRole("main")
        .querySelector(".hidden.lg\\:block");

      expect(mobileView).toBeInTheDocument();
      expect(desktopView).toBeInTheDocument();
    });
  });
});
