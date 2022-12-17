import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFilterSidebarCheckboxGroup from "@/components/JobResults/JobFilterSideBar/JobFilterSidebarCheckboxGroup.vue";

import { useRouter } from "vue-router";
import { vi } from "vitest";
vi.mock("vue-router");

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createProps = (props = {}) => ({
    header: "Some header",
    uniqueValues: new Set(["Value A", "Value B"]),
    action: vi.fn(),
    ...props,
  });

  const renderJobFiltersSidebarCheckboxGroup = (props) => {
    const pinia = createTestingPinia();

    render(JobFilterSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  it("renders unique list of values", async () => {
    const props = createProps({
      header: "Job Types",
      uniqueValues: new Set(["Full-time", "Part-time"]),
    });
    renderJobFiltersSidebarCheckboxGroup(props);

    const button = screen.getByRole("button", {
      name: /job types/i,
    });
    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      useRouter.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        header: "Job Types",
        uniqueValues: new Set(["Full-time", "Part-time"]),
        action,
      });
      renderJobFiltersSidebarCheckboxGroup(props);

      const button = screen.getByRole("button", {
        name: /job types/i,
      });
      await userEvent.click(button);

      const partTimeCheckbox = screen.getByRole("checkbox", {
        name: /part-time/i,
      });
      await userEvent.click(partTimeCheckbox);

      expect(action).toHaveBeenCalledWith(["Part-time"]);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });
      const props = createProps({
        header: "Job Types",
        uniqueValues: new Set(["Part-time"]),
      });
      renderJobFiltersSidebarCheckboxGroup(props);

      const button = screen.getByRole("button", {
        name: /job types/i,
      });
      await userEvent.click(button);

      const partTimeCheckbox = screen.getByRole("checkbox", {
        name: /part-time/i,
      });
      await userEvent.click(partTimeCheckbox);

      expect(push).toHaveBeenCalledWith({ name: "JobResults" });
    });
  });
});
