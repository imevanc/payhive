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
    features: false,
    company: false,
    login: false,
  });
});

test("should return correct selected paths for features", () => {
  mockUsePathname.mockImplementation(() => "/features");
  const { result } = renderHook(() => useSelectedPaths());
  expect(result.current.selectedPaths).toEqual({
    home: false,
    features: true,
    company: false,
    login: false,
  });
});

test("should return correct selected paths for company", () => {
  mockUsePathname.mockImplementation(() => "/company");
  const { result } = renderHook(() => useSelectedPaths());
  expect(result.current.selectedPaths).toEqual({
    home: false,
    features: false,
    company: true,
    login: false,
  });
});

test("should return correct selected paths for login", () => {
  mockUsePathname.mockImplementation(() => "/login");
  const { result } = renderHook(() => useSelectedPaths());
  expect(result.current.selectedPaths).toEqual({
    home: false,
    features: false,
    company: false,
    login: true,
  });
});
