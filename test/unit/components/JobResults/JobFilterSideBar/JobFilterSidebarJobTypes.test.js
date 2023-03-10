import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import JobFilterSidebarJobTypes from "@/components/JobResults/JobFilterSideBar/JobFilterSidebarJobTypes.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
vi.mock("vue-router");

describe("JobFiltersSidebarJobTypes", () => {
  const renderJobFiltersSidebarJobTypes = () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();
    const userStore = useUserStore();

    render(JobFilterSidebarJobTypes, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore, userStore };
  };

  it("renders unique list of job types from jobs", async () => {
    const { jobsStore } = renderJobFiltersSidebarJobTypes();
    jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

    const button = screen.getByRole("button", {
      name: /job types/i,
    });
    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole("listitem");
    const jobTypes = jobTypesListItems.map((node) => node.textContent);
    expect(jobTypes).toEqual(["Full-time", "Part-time"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for job type", async () => {
      useRouter.mockReturnValue({ push: vi.fn() });
      const { jobsStore, userStore } = renderJobFiltersSidebarJobTypes();
      jobsStore.UNIQUE_JOB_TYPES = new Set(["Full-time", "Part-time"]);

      const button = screen.getByRole("button", {
        name: /job types/i,
      });
      await userEvent.click(button);

      const partTimeCheckbox = screen.getByRole("checkbox", {
        name: /part-time/i,
      });
      await userEvent.click(partTimeCheckbox);

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith([
        "Part-time",
      ]);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });
      const { jobsStore } = renderJobFiltersSidebarJobTypes();
      jobsStore.UNIQUE_JOB_TYPES = new Set(["Part-time"]);

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
