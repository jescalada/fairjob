<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot :spotlight="spotlight"></slot>
    </li>
  </ul>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const spotlights = ref([]);

const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/spotlights`;
  const response = await axios.get(url);
  spotlights.value = response.data;
};

onMounted(getSpotlights);
</script>
