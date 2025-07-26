import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "util";

Object.assign(global, { TextDecoder, TextEncoder });

declare module "expect" {
  interface AsymmetricMatchers {}
  interface Matchers<R> {
    /**
     * @description
     * Assert whether an element is present in the document or not.
     * @example
     * <svg data-testid="svg-element"></svg>
     *
     * expect(queryByTestId('svg-element')).toBeInTheDocument()
     * expect(queryByTestId('does-not-exist')).not.toBeInTheDocument()
     * @see
     * [testing-library/jest-dom#tobeinthedocument](https://github.com/testing-library/jest-dom#tobeinthedocument)
     */
    toBeInTheDocument(): R;
    toBeVisible(): R;
  }
}

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    // Check if it's the JSDOM navigation error
    if (
      args[0] &&
      args[0].toString &&
      args[0].toString().includes("Not implemented: navigation")
    ) {
      return; // Suppress this specific error
    }
    // Call the original console.error for all other errors
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
