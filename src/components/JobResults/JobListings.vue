<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous</router-link
          >

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import JobListing from "@/components/JobResults/JobListing.vue";
import { useJobsStore } from "@/stores/jobs";

import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";

const jobsStore = useJobsStore();
onMounted(jobsStore.FETCH_JOBS);

const route = useRoute();

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);
const lastPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));
const currentPage = computed(() => Number.parseInt(route.query.page || "1"));

const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  lastPage
);

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const resultsPerPage = 10;
  const firstJobIndex = (pageNumber - 1) * resultsPerPage;
  const lastJobIndex = pageNumber * resultsPerPage;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});
</script>
