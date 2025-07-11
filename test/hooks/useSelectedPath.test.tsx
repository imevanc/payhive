import { renderHook } from "@testing-library/react";
import { useSelectedPath } from "@/hooks";

const mockUsePathname = jest.fn();

jest.mock("next/navigation", () => ({
  usePathname() {
    return mockUsePathname();
  },
}));

test("should return correct selected paths for home", () => {
  mockUsePathname.mockImplementation(() => "/");
  const { result } = renderHook(() => useSelectedPath());
  expect(result.current.selectedPath).toEqual({
    home: true,
    services: false,
    "about-us": false,
    contact: false,
    "sign-in": false,
  });
});

test("should return correct selected paths for features", () => {
  mockUsePathname.mockImplementation(() => "/services");
  const { result } = renderHook(() => useSelectedPath());
  expect(result.current.selectedPath).toEqual({
    home: false,
    services: true,
    "about-us": false,
    contact: false,
    "sign-in": false,
  });
});

test("should return correct selected paths for company", () => {
  mockUsePathname.mockImplementation(() => "/about-us");
  const { result } = renderHook(() => useSelectedPath());
  expect(result.current.selectedPath).toEqual({
    home: false,
    services: false,
    "about-us": true,
    contact: false,
    "sign-in": false,
  });
});

test("should return correct selected paths for signin", () => {
  mockUsePathname.mockImplementation(() => "/contact");
  const { result } = renderHook(() => useSelectedPath());
  expect(result.current.selectedPath).toEqual({
    home: false,
    services: false,
    "about-us": false,
    contact: true,
    "sign-in": false,
  });
});

test("should return correct selected paths for sign-in", () => {
  mockUsePathname.mockImplementation(() => "/sign-in");
  const { result } = renderHook(() => useSelectedPath());
  expect(result.current.selectedPath).toEqual({
    home: false,
    services: false,
    "about-us": false,
    contact: false,
    "sign-in": true,
  });
});
