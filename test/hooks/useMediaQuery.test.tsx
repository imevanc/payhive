import { renderHook, act } from "@testing-library/react";
import { useMediaQuery } from "@/hooks";

const mockMatchMedia = jest.fn();

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: mockMatchMedia,
  });
});

beforeEach(() => {
  mockMatchMedia.mockClear();
});

test("returns false when media query does not match", () => {
  const mockMediaQueryList = {
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  const { result } = renderHook(() => useMediaQuery("(min-width: 1024px)"));
  expect(result.current).toBe(false);
});

test("returns true when media query matches", () => {
  const mockMediaQueryList = {
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
  expect(result.current).toBe(true);
});

test("hook is called with correct media query string", () => {
  const mockMediaQueryList = {
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  renderHook(() => useMediaQuery("(min-width: 1200px)"));
  expect(mockMatchMedia).toHaveBeenCalledWith("(min-width: 1200px)");
});

test("hook returns boolean value", () => {
  const mockMediaQueryList = {
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));
  expect(typeof result.current).toBe("boolean");
});

test("hook works with max-width queries", () => {
  const mockMediaQueryList = {
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  const { result } = renderHook(() => useMediaQuery("(max-width: 767px)"));
  expect(result.current).toBe(false);
});

test("hook works with range queries", () => {
  const mockMediaQueryList = {
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  const { result } = renderHook(() =>
    useMediaQuery("(min-width: 768px) and (max-width: 1023px)"),
  );
  expect(result.current).toBe(true);
});

test("hook works with orientation queries", () => {
  const mockMediaQueryList = {
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  const { result } = renderHook(() =>
    useMediaQuery("(orientation: landscape)"),
  );
  expect(mockMatchMedia).toHaveBeenCalledWith("(orientation: landscape)");
  expect(result.current).toBe(true);
});

test("hook works with print media queries", () => {
  const mockMediaQueryList = {
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  const { result } = renderHook(() => useMediaQuery("print"));
  expect(mockMatchMedia).toHaveBeenCalledWith("print");
  expect(result.current).toBe(true);
});

test("hook responds to different query strings", () => {
  const mockMediaQueryList1 = {
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  const mockMediaQueryList2 = {
    matches: true,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  mockMatchMedia
    .mockReturnValueOnce(mockMediaQueryList1)
    .mockReturnValueOnce(mockMediaQueryList2);

  const { result: result1 } = renderHook(() =>
    useMediaQuery("(min-width: 1024px)"),
  );
  expect(result1.current).toBe(false);

  const { result: result2 } = renderHook(() =>
    useMediaQuery("(max-width: 768px)"),
  );
  expect(result2.current).toBe(true);
});

test("hook maintains return type consistency", () => {
  const mockMediaQueryList = {
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  const { result } = renderHook(() => useMediaQuery("(min-width: 1024px)"));
  expect(result.current).toEqual(expect.any(Boolean));
});

test("addEventListener is called on mount", () => {
  const mockAddEventListener = jest.fn();
  const mockMediaQueryList = {
    matches: false,
    addEventListener: mockAddEventListener,
    removeEventListener: jest.fn(),
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  renderHook(() => useMediaQuery("(min-width: 1024px)"));

  expect(mockAddEventListener).toHaveBeenCalledWith(
    "change",
    expect.any(Function),
  );
});

test("removeEventListener is called on unmount", () => {
  const mockRemoveEventListener = jest.fn();
  const mockMediaQueryList = {
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: mockRemoveEventListener,
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  const { unmount } = renderHook(() => useMediaQuery("(min-width: 1024px)"));

  unmount();

  expect(mockRemoveEventListener).toHaveBeenCalledWith(
    "change",
    expect.any(Function),
  );
});

test("state updates when media query changes", () => {
  let eventHandler: (event: MediaQueryListEvent) => void;
  const mockAddEventListener = jest.fn((event, handler) => {
    eventHandler = handler;
  });

  const mockMediaQueryList = {
    matches: false,
    addEventListener: mockAddEventListener,
    removeEventListener: jest.fn(),
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  const { result } = renderHook(() => useMediaQuery("(min-width: 1024px)"));

  expect(result.current).toBe(false);

  act(() => {
    eventHandler({ matches: true } as MediaQueryListEvent);
  });

  expect(result.current).toBe(true);
});

test("state updates correctly on multiple changes", () => {
  let eventHandler: (event: MediaQueryListEvent) => void;
  const mockAddEventListener = jest.fn((event, handler) => {
    eventHandler = handler;
  });

  const mockMediaQueryList = {
    matches: false,
    addEventListener: mockAddEventListener,
    removeEventListener: jest.fn(),
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  const { result } = renderHook(() => useMediaQuery("(min-width: 1024px)"));

  expect(result.current).toBe(false);

  act(() => {
    eventHandler({ matches: true } as MediaQueryListEvent);
  });

  expect(result.current).toBe(true);

  act(() => {
    eventHandler({ matches: false } as MediaQueryListEvent);
  });

  expect(result.current).toBe(false);
});

test("effect runs when query changes", () => {
  const mockMediaQueryList = {
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  };

  mockMatchMedia.mockReturnValue(mockMediaQueryList);

  const { rerender } = renderHook(({ query }) => useMediaQuery(query), {
    initialProps: { query: "(min-width: 1024px)" },
  });

  expect(mockMatchMedia).toHaveBeenCalledWith("(min-width: 1024px)");

  rerender({ query: "(max-width: 768px)" });

  expect(mockMatchMedia).toHaveBeenCalledWith("(max-width: 768px)");
});
