<template>
  <div class="cursor-pointer border-b border-solid border-brand-gray-2 py-5">
    <div
      class="flex flex-wrap items-center justify-between"
      role="button"
      @click="trigger"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>
    <div v-if="isOpen" class="mt-5 w-full">
      <slot>
        <p>No content here, buddy</p>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

defineProps({
  header: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);
const trigger = () => {
  isOpen.value = !isOpen.value;
};
const caretIcon = computed(() =>
  isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"]
);
</script>
