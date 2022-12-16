<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear Filters" type="secondary" />
        </div>
      </div>
      <JobFilterSidebarCategory />
      <JobFilterSidebarJobTypes />
    </section>
  </div>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue";
import JobFilterSidebarCategory from "@/components/JobResults/JobFilterSidebar/JobFilterSidebarCategory.vue";
import JobFilterSidebarJobTypes from "@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobTypes.vue";

export default {
  name: "JobFilterSidebar",
  components: {
    ActionButton,
    JobFilterSidebarCategory,
    JobFilterSidebarJobTypes,
  },
};
</script>
