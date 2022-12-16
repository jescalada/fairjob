import { createPinia, setActivePinia } from "pinia";
import { useJobsStore } from "@/stores/jobs";
import axios from "axios";
import { useUserStore } from "@/stores/user";

vi.mock("axios");

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores job listings", () => {
    const store = useJobsStore();
    expect(store.jobs).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe("FETCH_JOBS", () => {
    it("makes API request and stores received jobs", async () => {
      axios.get.mockResolvedValue({ data: ["Job 1", "Job 2"] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(["Job 1", "Job 2"]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: "Google" },
        { organization: "Amazon" },
        { organization: "Google" },
      ];

      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(["Google", "Amazon"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const store = useJobsStore();
      store.jobs = [
        { jobType: "Part-time" },
        { jobType: "Full-time" },
        { jobType: "Part-time" },
      ];

      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(["Part-time", "Full-time"]));
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user has not selected any organization", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];

        const store = useJobsStore();
        const job = { organization: "Google" };
        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given organizations", () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ["Google"];

      const store = useJobsStore();
      const job1 = { organization: "Google" };
      const job2 = { organization: "Amazon" };
      const result1 = store.INCLUDE_JOB_BY_ORGANIZATION(job1);
      const result2 = store.INCLUDE_JOB_BY_ORGANIZATION(job2);
      expect(result1).toBe(true);
      expect(result2).toBe(false);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected any job type", () => {
      it("includes job", () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];

        const store = useJobsStore();
        const job = { jobType: "Full-time" };
        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);
        expect(result).toBe(true);
      });
    });

    it("identifies if job is associated with given job types", () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ["Full-time"];

      const store = useJobsStore();
      const job1 = { jobType: "Full-time" };
      const job2 = { jobType: "Part-time" };
      const result1 = store.INCLUDE_JOB_BY_JOB_TYPE(job1);
      const result2 = store.INCLUDE_JOB_BY_JOB_TYPE(job2);
      expect(result1).toBe(true);
      expect(result2).toBe(false);
    });
  });
});
