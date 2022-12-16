import { render, screen } from "@testing-library/vue";
import { nextTick } from "vue";

import TheHeadline from "@/components/JobSearch/TheHeadline.vue";
import { vi } from "vitest";

describe("TheHeadline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("displays introductory keyword", () => {
    render(TheHeadline);
    const keyword = screen.getByRole("heading", {
      name: /Fair Recruiting/i,
    });
    expect(keyword).toBeInTheDocument();
  });

  it("changes keyword at a consistent interval", () => {
    const mock = vi.fn();
    vi.stubGlobal("setInterval", mock);
    render(TheHeadline);
    expect(mock).toHaveBeenCalled();
  });

  it("swaps keyword after interval", async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();
    await nextTick();
    const keyword = screen.getByRole("heading", {
      name: /Fair Interviewing/i,
    });
    expect(keyword).toBeInTheDocument();
  });

  it("removes interval when component disappears", () => {
    const clearInterval = vi.fn();
    vi.stubGlobal("clearInterval", clearInterval);
    const { unmount } = render(TheHeadline);
    unmount();
    expect(clearInterval).toHaveBeenCalled();
  });
});
