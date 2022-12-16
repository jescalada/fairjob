// Vite must be configured to make use of this file at the beginning of running the tests
import { cleanup } from "@testing-library/vue";
import matchers from "@testing-library/jest-dom/matchers";
import { expect, afterEach } from "vitest";

expect.extend(matchers);

// Vitest runs this after executed test
afterEach(() => {
  cleanup(); // Tears down the complete DOM including rendered components
});
