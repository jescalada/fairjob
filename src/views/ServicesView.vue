<template>
  <HeaderContainer>
    <template #title>
      <h1 class="w-full text-4xl font-semibold">Services</h1>
    </template>
    <template #subtitle
      ><h2 class="my-4 w-full text-base font-light">
        We provide various services to improve your job searching experience.
      </h2></template
    >
  </HeaderContainer>
</template>

<script>
import HeaderContainer from "@/components/Shared/HeaderContainer.vue";
export default {
  name: "ServicesView",
  components: {
    HeaderContainer,
  },
};
</script>
