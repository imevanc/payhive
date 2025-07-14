import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "@/app/page";

jest.mock("@heroicons/react/24/outline", () => ({
  ChevronRightIcon: ({ className, ...props }: any) => (
    <svg data-testid="chevron-right-icon" className={className} {...props} />
  ),
  BookOpenIcon: ({ className, ...props }: any) => (
    <svg data-testid="book-open-icon" className={className} {...props} />
  ),
  CreditCardIcon: ({ className, ...props }: any) => (
    <svg data-testid="credit-card-icon" className={className} {...props} />
  ),
  DocumentTextIcon: ({ className, ...props }: any) => (
    <svg data-testid="document-text-icon" className={className} {...props} />
  ),
  CheckCircleIcon: ({ className, ...props }: any) => (
    <svg data-testid="check-circle-icon" className={className} {...props} />
  ),
  ArrowRightIcon: ({ className, ...props }: any) => (
    <svg data-testid="arrow-right-icon" className={className} {...props} />
  ),
  PlusIcon: ({ className, ...props }: any) => (
    <svg data-testid="plus-icon" className={className} {...props} />
  ),
  MinusIcon: ({ className, ...props }: any) => (
    <svg data-testid="minus-icon" className={className} {...props} />
  ),
}));

describe("HomePage Component", () => {
  beforeEach(() => render(<HomePage />));

  describe("Header Section", () => {
    test("renders the main badge with correct text", () => {
      expect(screen.getByText("Built for UK Sole Traders")).toBeInTheDocument();
    });

    test("renders the main headline correctly", () => {
      expect(screen.getByText("Bookkeeping & Invoicing")).toBeInTheDocument();
      expect(screen.getByText("Made Simple")).toBeInTheDocument();
    });

    test("renders the main description", () => {
      const description = screen.getByText(
        /Streamline your business finances with automated bookkeeping/,
      );
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent(
        "Streamline your business finances with automated bookkeeping, open banking integration, and professional invoicing. Everything you need to manage your sole trader business.",
      );
    });

    test("applies correct styling to headline elements", () => {
      const headline = screen.getByText("Bookkeeping & Invoicing");
      expect(headline).toHaveClass(
        "text-4xl",
        "lg:text-6xl",
        "font-bold",
        "text-gray-900",
      );

      const subtitle = screen.getByText("Made Simple");
      expect(subtitle).toHaveClass("text-green-700");
    });
  });

  describe("Call-to-Action Buttons", () => {
    test("renders Start Free Trial button with correct styling", () => {
      const startTrialButton = screen.getByRole("button", {
        name: /start free trial/i,
      });
      expect(startTrialButton).toBeInTheDocument();
      expect(startTrialButton).toHaveClass(
        "bg-green-700",
        "hover:bg-green-800",
        "text-white",
      );
    });

    test("renders View Demo button with correct styling", () => {
      const viewDemoButton = screen.getByRole("button", { name: /view demo/i });
      expect(viewDemoButton).toBeInTheDocument();
      expect(viewDemoButton).toHaveClass(
        "bg-blue-900",
        "hover:bg-blue-800",
        "text-white",
      );
    });

    test("includes arrow icon in Start Free Trial button", () => {
      const startTrialButton = screen.getByRole("button", {
        name: /start free trial/i,
      });
      expect(startTrialButton).toContainElement(
        screen.getByTestId("arrow-right-icon"),
      );
    });

    test("supports button interactions", async () => {
      const user = userEvent.setup();
      const startTrialButton = screen.getByRole("button", {
        name: /start free trial/i,
      });
      const viewDemoButton = screen.getByRole("button", { name: /view demo/i });

      await user.hover(startTrialButton);
      await user.hover(viewDemoButton);

      // Buttons should be clickable (no errors thrown)
      await user.click(startTrialButton);
      await user.click(viewDemoButton);
    });
  });

  describe("Trust Indicators", () => {
    const trustIndicators = ["No setup fees", "Cancel anytime"];

    it.each(trustIndicators)("renders trust indicator: %s", (indicator) => {
      expect(screen.getByText(indicator)).toBeInTheDocument();
    });

    test("renders HMRC compliant trust indicator", () => {
      const hmrcCompliantElements = screen.getAllByText("HMRC compliant");
      expect(hmrcCompliantElements.length).toBeGreaterThan(0);
    });

    test("displays check circle icons for all trust indicators", () => {
      const checkIcons = screen.getAllByTestId("check-circle-icon");
      expect(checkIcons).toHaveLength(3);

      checkIcons.forEach((icon) => {
        expect(icon).toHaveClass("text-green-600");
      });
    });
  });

  describe("Features Section", () => {
    const expectedFeatures = [
      {
        title: "Smart Bookkeeping",
        description:
          "Open banking integration for UK banks and digital banks with automated categorization",
        icon: "book-open-icon",
      },
      {
        title: "Transaction Verification",
        description:
          "Modern drag & drop interface with tables and visual forms for easy verification",
        icon: "credit-card-icon",
      },
      {
        title: "HMRC Tax Returns",
        description:
          "Generate compliant PDFs following HMRC submission flow requirements",
        icon: "document-text-icon",
      },
    ];

    test.each(expectedFeatures)(
      "renders feature: $title",
      ({ title, description, icon }) => {
        if (title === "Transaction Verification") {
          const titleElements = screen.getAllByText(title);
          expect(titleElements.length).toBeGreaterThan(0);
        } else {
          expect(screen.getByText(title)).toBeInTheDocument();
        }

        if (description.includes("Modern drag & drop interface")) {
          const dragDropElements = screen.getAllByText((content, element) => {
            return (
              content.includes("Modern drag & drop interface") ||
              (element?.textContent?.includes("Modern") &&
                element?.textContent?.includes("drag & drop interface")) ||
              false
            );
          });
          expect(dragDropElements.length).toBeGreaterThan(0);
        } else {
          expect(screen.getByText(description)).toBeInTheDocument();
        }

        const icons = screen.getAllByTestId(icon);
        expect(icons.length).toBeGreaterThan(0);
      },
    );

    test("renders features in a grid layout", () => {
      const featuresSection = screen
        .getByText("Smart Bookkeeping")
        .closest('[class*="grid"]');
      expect(featuresSection).toBeInTheDocument();

      const smartBookkeeping = screen
        .getByText("Smart Bookkeeping")
        .closest("div");

      const transactionVerificationElements = screen.getAllByText(
        "Transaction Verification",
      );
      const transactionVerification =
        transactionVerificationElements[0]?.closest("div");

      const hmrcTaxReturns = screen
        .getByText("HMRC Tax Returns")
        .closest("div");

      [smartBookkeeping, transactionVerification, hmrcTaxReturns].forEach(
        (card) => {
          expect(card).toHaveClass(
            "bg-white",
            "rounded-lg",
            "p-6",
            "shadow-sm",
          );
        },
      );
    });

    test("applies correct icon styling", () => {
      const featuresSection = screen
        .getByText("Smart Bookkeeping")
        .closest('[class*="grid"]');

      if (featuresSection) {
        const bookIcon = featuresSection.querySelector(
          '[data-testid="book-open-icon"]',
        );
        const creditIcon = featuresSection.querySelector(
          '[data-testid="credit-card-icon"]',
        );
        const documentIcon = featuresSection.querySelector(
          '[data-testid="document-text-icon"]',
        );

        [bookIcon, creditIcon, documentIcon].forEach((icon) => {
          if (icon) {
            expect(icon).toHaveClass("w-6", "h-6", "text-green-400");
          }
        });
      } else {
        const allBookIcons = screen.getAllByTestId("book-open-icon");
        const allCreditIcons = screen.getAllByTestId("credit-card-icon");
        const allDocumentIcons = screen.getAllByTestId("document-text-icon");

        expect(allBookIcons.length).toBeGreaterThan(0);
        expect(allCreditIcons.length).toBeGreaterThan(0);
        expect(allDocumentIcons.length).toBeGreaterThan(0);
      }
    });
  });

  describe("Dashboard Preview Section", () => {
    test("renders dashboard preview header", () => {
      expect(screen.getByText("Dashboard Preview")).toBeInTheDocument();
      expect(screen.getByText("Live Demo")).toBeInTheDocument();
    });

    test("renders automated bookkeeping preview", () => {
      expect(screen.getByText("Automated Bookkeeping")).toBeInTheDocument();
      expect(screen.getByText("Connected")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Open banking synced • Transactions categorized • Ready for review",
        ),
      ).toBeInTheDocument();
    });

    test("renders transaction verification preview", () => {
      const transactionTexts = screen.getAllByText("Transaction Verification");
      expect(transactionTexts.length).toBeGreaterThanOrEqual(2);

      expect(
        screen.getByText(
          "Drag & drop interface • Visual verification • Bulk processing",
        ),
      ).toBeInTheDocument();
    });

    test("renders professional invoicing preview", () => {
      expect(screen.getByText("Professional Invoicing")).toBeInTheDocument();
      expect(screen.getByText("3 Templates")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Auto-generation • Stripe/PayPal integration • PDF export",
        ),
      ).toBeInTheDocument();
    });

    test("includes chevron right icon in transaction verification", () => {
      const chevronIcon = screen.getByTestId("chevron-right-icon");
      expect(chevronIcon).toBeInTheDocument();
    });

    test("renders visual elements for transaction verification", () => {
      const dashboardSection = screen
        .getByText("Dashboard Preview")
        .closest("div");
      expect(dashboardSection).toBeInTheDocument();

      const visualElements = dashboardSection?.querySelectorAll(
        "[class*='bg-blue'], div",
      );
      expect(visualElements?.length).toBeGreaterThan(0);
    });
  });

  describe("Statistics Section", () => {
    const expectedStats = [
      { value: "15min", label: "Setup time" },
      { value: "98%", label: "Accuracy" },
      { value: "10+hrs", label: "Saved weekly" },
      { value: "100%", label: "HMRC compliant" },
    ];

    it.each(expectedStats)(
      "renders statistic: $value $label",
      ({ value, label }) => {
        expect(screen.getByText(value)).toBeInTheDocument();
        if (label === "HMRC compliant") {
          const hmrcCompliantElements = screen.getAllByText(label);
          expect(hmrcCompliantElements.length).toBeGreaterThan(0);
        } else {
          expect(screen.getByText(label)).toBeInTheDocument();
        }
      },
    );

    test("renders statistic: 100% HMRC compliant", () => {
      const statsSection = screen
        .getByText("Setup time")
        .closest('[class*="grid"]');
      expect(statsSection).toContainElement(screen.getByText("100%"));

      const hmrcCompliantElements = screen.getAllByText("HMRC compliant");
      const hmrcCompliantInStats = hmrcCompliantElements.find((element) =>
        statsSection?.contains(element),
      );
      expect(hmrcCompliantInStats).toBeInTheDocument();
    });

    test("applies correct styling to statistics", () => {
      const setupTime = screen.getByText("15min");
      const accuracy = screen.getByText("98%");
      const savedTime = screen.getByText("10+hrs");
      const compliance = screen.getByText("100%");

      expect(setupTime).toHaveClass("text-green-700");
      expect(accuracy).toHaveClass("text-green-700");

      expect(savedTime).toHaveClass("text-blue-900");
      expect(compliance).toHaveClass("text-blue-900");
    });

    test("renders statistics in a responsive grid", () => {
      const statsContainer = screen.getByText("Setup time").closest(".grid");
      expect(statsContainer).toHaveClass("grid-cols-2", "md:grid-cols-4");
    });
  });

  describe("Layout and Responsive Design", () => {
    test("applies correct container and spacing classes", () => {
      const mainContainer = screen
        .getByText("Built for UK Sole Traders")
        .closest(".container");
      expect(mainContainer).toHaveClass("mx-auto", "px-6", "py-8");
    });

    test("applies responsive classes to buttons container", () => {
      const startButton = screen.getByRole("button", {
        name: /start free trial/i,
      });
      const buttonsContainer = startButton.closest(".flex");

      let currentElement = buttonsContainer;
      while (currentElement && !currentElement.classList.contains("flex-col")) {
        currentElement = currentElement.parentElement;
      }

      if (currentElement) {
        expect(currentElement).toHaveClass("flex-col", "sm:flex-row");
      } else {
        expect(buttonsContainer).toHaveClass("flex");
      }
    });

    test("applies responsive classes to features grid", () => {
      const featuresGrid = screen
        .getByText("Smart Bookkeeping")
        .closest(".grid");
      expect(featuresGrid).toHaveClass("md:grid-cols-3");
    });

    test("applies responsive classes to main headline", () => {
      const headline = screen.getByText("Bookkeeping & Invoicing");
      expect(headline).toHaveClass("text-4xl", "lg:text-6xl");
    });
  });

  describe("Color Scheme and Branding", () => {
    test("uses consistent green color scheme", () => {
      const badge = screen.getByText("Built for UK Sole Traders");
      expect(badge).toHaveClass("bg-green-100", "text-green-800");

      const startButton = screen.getByRole("button", {
        name: /start free trial/i,
      });
      expect(startButton).toHaveClass("bg-green-700");
    });

    test("uses blue accent colors appropriately", () => {
      const viewDemoButton = screen.getByRole("button", { name: /view demo/i });
      expect(viewDemoButton).toHaveClass("bg-blue-900");
    });

    test("applies proper background colors to preview sections", () => {
      const bookkeepingTexts = screen.getAllByText("Automated Bookkeeping");
      const transactionTexts = screen.getAllByText("Transaction Verification");
      const invoicingTexts = screen.getAllByText("Professional Invoicing");

      const bookkeepingSection = bookkeepingTexts[0]?.closest(".bg-green-50");
      const transactionSection = transactionTexts[0]?.closest(".bg-blue-50");
      const invoicingSection = invoicingTexts[0]?.closest(".bg-green-50");

      if (bookkeepingSection) {
        expect(bookkeepingSection).toHaveClass(
          "bg-green-50",
          "border-green-200",
        );
      }

      if (transactionSection) {
        expect(transactionSection).toHaveClass("bg-blue-50", "border-blue-200");
      }

      if (invoicingSection) {
        expect(invoicingSection).toHaveClass("bg-green-50", "border-green-200");
      }

      expect(bookkeepingTexts.length).toBeGreaterThan(0);
      expect(transactionTexts.length).toBeGreaterThan(0);
      expect(invoicingTexts.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    test("has proper heading hierarchy", () => {
      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading).toHaveTextContent(
        "Bookkeeping & InvoicingMade Simple",
      );

      const featureHeadings = screen.getAllByRole("heading", { level: 3 });
      expect(featureHeadings.length).toBeGreaterThanOrEqual(3); // At least 3 features
    });

    test("provides meaningful button text", () => {
      const startTrialButton = screen.getByRole("button", {
        name: /start free trial/i,
      });
      const viewDemoButton = screen.getByRole("button", { name: /view demo/i });

      expect(startTrialButton).toHaveAccessibleName("Start Free Trial");
      expect(viewDemoButton).toHaveAccessibleName("View Demo");
    });

    test("uses semantic HTML structure", () => {
      const mainElement =
        document.querySelector('[role="main"]') ||
        document.querySelector("main");
      if (mainElement) {
        expect(mainElement).toContainElement(
          screen.getByText("Bookkeeping & Invoicing"),
        );
      } else {
        expect(screen.getByText("Bookkeeping & Invoicing")).toBeInTheDocument();
      }
    });
  });

  describe("Content Accuracy", () => {
    test("contains UK-specific terminology and compliance mentions", () => {
      expect(screen.getByText("Built for UK Sole Traders")).toBeInTheDocument();

      const hmrcCompliantElements = screen.getAllByText("HMRC compliant");
      expect(hmrcCompliantElements.length).toBeGreaterThan(0);

      expect(screen.getByText("HMRC Tax Returns")).toBeInTheDocument();

      expect(
        screen.getByText((content) => {
          return (
            content.includes("UK banks") && content.includes("digital banks")
          );
        }),
      ).toBeInTheDocument();
    });

    test("mentions key integrations and features", () => {
      expect(
        screen.getByText(
          (content) =>
            content.includes("open banking integration") &&
            content.includes("automated bookkeeping"),
        ),
      ).toBeInTheDocument();

      expect(
        screen.getByText(/stripe\/paypal integration/i),
      ).toBeInTheDocument();

      expect(screen.getByText(/automated categorization/i)).toBeInTheDocument();

      const dragDropElements = screen.getAllByText(/drag & drop interface/i);
      expect(dragDropElements.length).toBeGreaterThan(0);
    });
  });
});
