<template>
  <img
    :src="imageLink"
    class="h-10 w-10 rounded-3xl object-contain"
    alt="User Profile Image"
  />
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      imageLink: "https://jescalada.com/images/Juan_Escalada.png",
    };
  },
};
</script>
