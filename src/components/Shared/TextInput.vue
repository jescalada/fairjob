<template>
  <input
    type="text"
    :value="modelValue"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>

<script>
// Using a prop to mutate the data eliminates data duplication
// The data flows from the parent and back again with the updated value
export default {
  name: "TextInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"], // This is a Vue validation
  methods: {
    // This matches the Vue convention (it's just a given name)
    handleInput($event) {
      // By using update:
      this.$emit("update:modelValue", $event.target.value);
    },
  },
};
</script>
