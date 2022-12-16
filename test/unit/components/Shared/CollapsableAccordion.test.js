import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import CollapsableAccordion from "@/components/Shared/CollapsableAccordion.vue";

describe("CollapsableAccordion", () => {
  const renderCollapsableAccordion = (config = {}) => {
    render(CollapsableAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: "My Category",
      },
      slots: { default: "<h3>My nested child</h3>" },
      ...config,
    });
  };

  it("renders child content", async () => {
    const props = {
      header: "My Category",
    };

    const slots = {
      default: "<h3>My nested child</h3>",
    };

    renderCollapsableAccordion({ props, slots });

    expect(screen.queryByText("My nested child")).not.toBeInTheDocument();
    const button = screen.getByRole("button", { name: /my category/i });
    await userEvent.click(button);
    expect(screen.getByText("My nested child")).toBeInTheDocument();
  });

  describe("when parent does not provide custom child content", () => {
    it("renders default content", async () => {
      const props = {
        header: "My Category",
      };

      const slots = {};

      renderCollapsableAccordion({ props, slots });

      const button = screen.getByRole("button", { name: /my category/i });
      await userEvent.click(button);
      expect(screen.getByText("No content here, buddy")).toBeInTheDocument();
    });
  });
});
