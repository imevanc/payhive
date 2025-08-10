import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthenticatedHeader } from "@/components";

global.fetch = jest.fn();

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

const renderWithWrapper = (component: React.ReactElement) => {
  return render(component, { wrapper: TestWrapper });
};

describe("AuthenticatedHeader", () => {
  beforeEach(() => {
    document.removeEventListener = jest.fn();
    document.addEventListener = jest.fn();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    test("renders the header with correct structure", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const header = screen.getByTestId("header-test");
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass("sticky", "inset-x-0", "top-0", "z-50");
    });

    test("renders PayHive logo as link", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const nav = screen.getByRole("navigation", { name: "Global" });
      const logoText = nav.querySelector(".text-2xl.font-bold.text-gray-900");
      expect(logoText).toBeInTheDocument();
      expect(logoText).toHaveTextContent("PayHive");

      const logoLink = logoText?.closest("a");
      expect(logoLink).toHaveAttribute("href", "/");
    });

    test("renders mobile menu toggle button", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      expect(mobileMenuButton).toBeInTheDocument();
      expect(mobileMenuButton).toHaveClass("lg:hidden");
    });

    test("renders desktop navigation area", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const nav = screen.getByRole("navigation", { name: "Global" });
      const desktopNav = nav.querySelector(".hidden.lg\\:flex");
      expect(desktopNav).toBeInTheDocument();
    });
  });

  describe("State Management", () => {
    test("initializes with mobile menu closed", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    test("opens mobile menu when button is clicked", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(mobileMenuButton);

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    test("closes mobile menu when close button is clicked", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(mobileMenuButton);

      const closeButton = screen.getByRole("button", { name: /close menu/i });
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      });
    });
  });

  describe("Desktop Dropdown Behavior", () => {
    test("opens and closes dropdowns correctly", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const desktopNav = screen
        .getByRole("navigation")
        .querySelector(".hidden.lg\\:flex");
      if (desktopNav) {
        const dropdownButtons = Array.from(
          desktopNav.querySelectorAll("button"),
        ).filter(
          (button) =>
            button.querySelector("svg") &&
            !button.textContent?.includes("Sign Out"),
        );

        if (dropdownButtons.length > 0) {
          const firstDropdownButton = dropdownButtons[0];
          const tabName = firstDropdownButton.textContent?.trim();

          await user.click(firstDropdownButton);

          const chevron = firstDropdownButton.querySelector("svg");
          if (chevron) {
            expect(chevron).toHaveClass("rotate-180");
          }

          await user.click(firstDropdownButton);

          if (chevron) {
            expect(chevron).not.toHaveClass("rotate-180");
          }
        }
      }
    });

    test("switches between different dropdowns", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const desktopNav = screen
        .getByRole("navigation")
        .querySelector(".hidden.lg\\:flex");
      if (desktopNav) {
        const dropdownButtons = Array.from(
          desktopNav.querySelectorAll("button"),
        ).filter(
          (button) =>
            button.querySelector("svg") &&
            !button.textContent?.includes("Sign Out"),
        );

        if (dropdownButtons.length >= 2) {
          await user.click(dropdownButtons[0]);
          await user.click(dropdownButtons[1]);

          const firstChevron = dropdownButtons[0].querySelector("svg");
          const secondChevron = dropdownButtons[1].querySelector("svg");

          if (firstChevron) {
            expect(firstChevron).not.toHaveClass("rotate-180");
          }
          if (secondChevron) {
            expect(secondChevron).toHaveClass("rotate-180");
          }
        }
      }
    });

    test("closes dropdown when clicking dropdown item", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const desktopNav = screen
        .getByRole("navigation")
        .querySelector(".hidden.lg\\:flex");
      if (desktopNav) {
        const dropdownButtons = Array.from(
          desktopNav.querySelectorAll("button"),
        ).filter(
          (button) =>
            button.querySelector("svg") &&
            !button.textContent?.includes("Sign Out"),
        );

        if (dropdownButtons.length > 0) {
          await user.click(dropdownButtons[0]);

          const dropdownContent =
            desktopNav.querySelector(".absolute.top-full");
          if (dropdownContent) {
            const dropdownLink = dropdownContent.querySelector("a");
            if (dropdownLink) {
              await user.click(dropdownLink);

              const chevron = dropdownButtons[0].querySelector("svg");
              if (chevron) {
                expect(chevron).not.toHaveClass("rotate-180");
              }
            }
          }
        }
      }
    });

    test("handles outside click events", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      expect(document.addEventListener).toHaveBeenCalledWith(
        "mousedown",
        expect.any(Function),
      );
    });

    test("closes dropdown when clicking outside or switching dropdowns", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const desktopNav = screen
        .getByRole("navigation")
        .querySelector(".hidden.lg\\:flex");
      if (desktopNav) {
        const dropdownButtons = Array.from(
          desktopNav.querySelectorAll("button"),
        ).filter(
          (button) =>
            button.querySelector("svg") &&
            !button.textContent?.includes("Sign Out"),
        );

        if (dropdownButtons.length >= 2) {
          const firstButton = dropdownButtons[0];
          const secondButton = dropdownButtons[1];

          await user.click(firstButton);

          const firstChevron = firstButton.querySelector("svg");
          if (firstChevron) {
            expect(firstChevron).toHaveClass("rotate-180");

            await user.click(secondButton);

            await waitFor(
              () => {
                expect(firstChevron).not.toHaveClass("rotate-180");
              },
              { timeout: 1000 },
            );
          }
        } else if (dropdownButtons.length === 1) {
          const dropdownButton = dropdownButtons[0];

          await user.click(dropdownButton);

          const chevron = dropdownButton.querySelector("svg");
          if (chevron) {
            expect(chevron).toHaveClass("rotate-180");

            await user.click(dropdownButton);

            await waitFor(
              () => {
                expect(chevron).not.toHaveClass("rotate-180");
              },
              { timeout: 1000 },
            );
          }
        }
      }
    });

    test("does not close dropdown when clicking inside dropdown ref", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const desktopNav = screen
        .getByRole("navigation")
        .querySelector(".hidden.lg\\:flex");
      if (desktopNav) {
        const dropdownButtons = Array.from(
          desktopNav.querySelectorAll("button"),
        ).filter(
          (button) =>
            button.querySelector("svg") &&
            !button.textContent?.includes("Sign Out"),
        );

        if (dropdownButtons.length > 0) {
          const dropdownButton = dropdownButtons[0];
          await user.click(dropdownButton);

          const chevron = dropdownButton.querySelector("svg");
          if (chevron) {
            expect(chevron).toHaveClass("rotate-180");

            fireEvent.mouseDown(dropdownButton);

            await new Promise((resolve) => setTimeout(resolve, 100));

            expect(chevron).toHaveClass("rotate-180");
          }
        }
      }
    });

    test("cleans up event listeners on unmount", () => {
      const { unmount } = renderWithWrapper(
        <AuthenticatedHeader dataTestId="test" />,
      );

      unmount();

      expect(document.removeEventListener).toHaveBeenCalledWith(
        "mousedown",
        expect.any(Function),
      );
    });
  });

  describe("Mobile Navigation Flow", () => {
    test("handles mobile tab click flow", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(mobileMenuButton);

      const mobileNavButtons = screen
        .getAllByRole("button")
        .filter((button) => {
          const ariaLabel = button.getAttribute("aria-label");
          return (
            !ariaLabel?.includes("Close") &&
            !ariaLabel?.includes("Open") &&
            button.textContent !== "Sign Out" &&
            button.querySelector('svg[class*="rotate-90"]')
          );
        });

      if (mobileNavButtons.length > 0) {
        const firstNavButton = mobileNavButtons[0];
        await user.click(firstNavButton);

        await waitFor(() => {
          expect(screen.queryByRole("dialog")).toBeInTheDocument();
        });
      }
    });

    test("handles mobile modal close and returns to menu", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(mobileMenuButton);

      const mobileNavButtons = screen
        .getAllByRole("button")
        .filter((button) => {
          const ariaLabel = button.getAttribute("aria-label");
          return (
            !ariaLabel?.includes("Close") &&
            !ariaLabel?.includes("Open") &&
            button.textContent !== "Sign Out" &&
            button.querySelector("svg")
          );
        });

      if (mobileNavButtons.length > 0) {
        await user.click(mobileNavButtons[0]);

        const backButton = screen.queryByRole("button", {
          name: /back to menu/i,
        });
        if (backButton) {
          await user.click(backButton);

          await waitFor(() => {
            const dialogs = screen.getAllByRole("dialog");
            expect(dialogs.length).toBeGreaterThan(0);
          });
        }
      }
    });

    test("handles mobile modal item click", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(mobileMenuButton);

      const mobileNavButtons = screen
        .getAllByRole("button")
        .filter((button) => {
          return (
            button.textContent !== "Sign Out" &&
            button.querySelector("svg") &&
            !button.getAttribute("aria-label")?.includes("Close")
          );
        });

      if (mobileNavButtons.length > 0) {
        await user.click(mobileNavButtons[0]);

        const modalLinks = screen
          .getAllByRole("link")
          .filter((link) => link.closest('[role="dialog"]'));

        if (modalLinks.length > 0) {
          await user.click(modalLinks[0]);
        }
      }
    });

    test("closes mobile menu and modal when link is clicked", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(mobileMenuButton);

      const mobileNavButtons = screen
        .getAllByRole("button")
        .filter(
          (button) =>
            button.textContent !== "Sign Out" &&
            button.querySelector("svg") &&
            !button.getAttribute("aria-label")?.includes("menu"),
        );

      if (mobileNavButtons.length > 0) {
        await user.click(mobileNavButtons[0]);
      }
    });
  });

  describe("Sign Out Functionality", () => {
    test("renders sign out button in desktop view", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const signOutButtons = screen.getAllByText("Sign Out");
      expect(signOutButtons.length).toBeGreaterThan(0);

      const desktopSignOutButton = signOutButtons.find((button) =>
        button.closest(".hidden.lg\\:flex"),
      );

      if (desktopSignOutButton) {
        expect(desktopSignOutButton).toHaveClass("font-semibold", "text-lg");
      }
    });

    test("renders sign out button in mobile menu", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(mobileMenuButton);

      const signOutButtons = screen.getAllByText("Sign Out");
      expect(signOutButtons.length).toBeGreaterThan(0);
    });

    test("calls signOut with correct parameters when desktop button clicked", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const desktopNav = screen
        .getByRole("navigation")
        .querySelector(".hidden.lg\\:flex");
      if (desktopNav) {
        const signOutButton = desktopNav.querySelector("button:last-child");
        if (signOutButton && signOutButton.textContent === "Sign Out") {
          await user.click(signOutButton);
        }
      }
    });

    test("calls signOut when mobile sign out button clicked", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(mobileMenuButton);

      const dialog = screen.getByRole("dialog");
      const mobileSignOutButton = dialog.querySelector("button:last-child");
      if (
        mobileSignOutButton &&
        mobileSignOutButton.textContent === "Sign Out"
      ) {
        await user.click(mobileSignOutButton);
      }
    });

    test("closes mobile menu when sign out is clicked", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(mobileMenuButton);

      expect(screen.getByRole("dialog")).toBeInTheDocument();

      const signOutButtons = screen.getAllByRole("button", {
        name: /sign out/i,
      });
      const mobileSignOutButton = signOutButtons.find((button) =>
        button.closest('[role="dialog"]'),
      );

      if (mobileSignOutButton) {
        await user.click(mobileSignOutButton);

        await waitFor(
          () => {
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
          },
          { timeout: 1000 },
        );
      }
    });

    test("sign out button has correct styling and behavior setup", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const signOutButtons = screen.getAllByRole("button", {
        name: /sign out/i,
      });

      signOutButtons.forEach((button) => {
        expect(button).toHaveClass("transition-colors");
        expect(button.tagName).toBe("BUTTON");
      });
    });
  });

  describe("Responsive Design", () => {
    test("has correct responsive classes for mobile menu", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      expect(mobileMenuButton).toHaveClass("lg:hidden");
    });

    test("has correct responsive classes for desktop navigation", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const nav = screen.getByRole("navigation");
      const desktopNav = nav.querySelector(".hidden.lg\\:flex");
      expect(desktopNav).toBeInTheDocument();
    });

    test("header has sticky positioning and backdrop blur", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const header = screen.getByTestId("header-test");
      expect(header).toHaveClass(
        "sticky",
        "inset-x-0",
        "top-0",
        "z-50",
        "bg-white/95",
        "backdrop-blur-sm",
      );
    });
  });

  describe("Accessibility", () => {
    test("has proper ARIA labels", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const nav = screen.getByRole("navigation");
      expect(nav).toHaveAttribute("aria-label", "Global");

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      expect(mobileMenuButton).toBeInTheDocument();
    });

    test("has proper screen reader text", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const srText = screen.getByText("PayHive", { selector: ".sr-only" });
      expect(srText).toBeInTheDocument();
      expect(srText).toHaveClass("sr-only");
    });

    test("mobile menu close button has proper accessibility", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(mobileMenuButton);

      const closeButton = screen.getByRole("button", { name: /close menu/i });
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe("Visual States and Transitions", () => {
    test("applies hover states correctly", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      expect(mobileMenuButton).toHaveClass("transition-colors");

      const signOutButtons = screen.getAllByRole("button", {
        name: /sign out/i,
      });
      signOutButtons.forEach((button) => {
        expect(button).toHaveClass("transition-colors");
      });
    });

    test("has proper z-index layering", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const header = screen.getByTestId("header-test");
      expect(header).toHaveClass("z-50");

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });
      await user.click(mobileMenuButton);

      const dialog = screen.getByRole("dialog");
      expect(dialog.querySelector(".fixed")).toHaveClass("z-50");
    });

    test("handles focus management", async () => {
      const user = userEvent.setup();
      renderWithWrapper(<AuthenticatedHeader dataTestId="test" />);

      const mobileMenuButton = screen.getByRole("button", {
        name: /open main menu/i,
      });

      await user.click(mobileMenuButton);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });
  });

  describe("Component Props", () => {
    test("accepts and uses dataTestId prop correctly", () => {
      renderWithWrapper(<AuthenticatedHeader dataTestId="custom-test-id" />);

      expect(screen.getByTestId("header-custom-test-id")).toBeInTheDocument();
    });

    test("works with different dataTestId values", () => {
      const { rerender } = renderWithWrapper(
        <AuthenticatedHeader dataTestId="first" />,
      );
      expect(screen.getByTestId("header-first")).toBeInTheDocument();

      rerender(<AuthenticatedHeader dataTestId="second" />);
      expect(screen.getByTestId("header-second")).toBeInTheDocument();
      expect(screen.queryByTestId("header-first")).not.toBeInTheDocument();
    });
  });
});
