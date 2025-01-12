import { renderHook } from "@testing-library/react";
import { useSelectedPaths } from "./useSelectedPaths";

const mockUsePathname = jest.fn();
jest.mock("next/navigation", () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

test("should return correct selected paths for home", () => {
  mockUsePathname.mockImplementation(() => "/");
  const { result } = renderHook(() => useSelectedPaths());
  expect(result.current.selectedPaths).toEqual({
    home: true,
    "what-we-offer": false,
    "about-us": false,
    "sign-in": false,
  });
});

test("should return correct selected paths for features", () => {
  mockUsePathname.mockImplementation(() => "/what-we-offer");
  const { result } = renderHook(() => useSelectedPaths());
  expect(result.current.selectedPaths).toEqual({
    home: false,
    "what-we-offer": true,
    "about-us": false,
    "sign-in": false,
  });
});

test("should return correct selected paths for company", () => {
  mockUsePathname.mockImplementation(() => "/about-us");
  const { result } = renderHook(() => useSelectedPaths());
  expect(result.current.selectedPaths).toEqual({
    home: false,
    "what-we-offer": false,
    "about-us": true,
    "sign-in": false,
  });
});

test("should return correct selected paths for signin", () => {
  mockUsePathname.mockImplementation(() => "/sign-in");
  const { result } = renderHook(() => useSelectedPaths());
  expect(result.current.selectedPaths).toEqual({
    home: false,
    "what-we-offer": false,
    "about-us": false,
    "sign-in": true,
  });
});
