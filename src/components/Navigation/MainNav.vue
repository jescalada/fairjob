<template>
  <header :class="[headerHeightClass, 'w-full', 'text-sm']">
    <div class="fixed top-0 left-0 h-16 w-full bg-white">
      <div
        class="no-wrap mx-auto flex h-full border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl font-bold"
          >FairJob</router-link
        >

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="ml-9 h-full first:ml-0"
            >
              <router-link
                :to="menuItem.url"
                class="flex h-full items-center py-2.5"
                >{{ menuItem.text }}</router-link
              >
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <ProfileImage v-if="isLoggedIn" />
          <ActionButton
            v-else
            text="Sign in"
            type="primary"
            @click="loginUser"
          />
        </div>
      </div>

      <SubNav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from "pinia";

import { useUserStore } from "@/stores/user";

import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import SubNav from "@/components/Navigation/SubNav.vue";

export default {
  name: "MainNav",
  components: {
    ActionButton,
    ProfileImage,
    SubNav,
  },
  data() {
    return {
      menuItems: [
        { text: "Services", url: "/services" },
        { text: "Location", url: "/" },
        { text: "Jobs", url: "/jobs" },
        { text: "Contact Us", url: "/" },
      ],
    };
  },
  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]), // this.userStore becomes available
    headerHeightClass() {
      return {
        "h-16": !this.isLoggedin,
        "h-32": this.isLoggedIn,
      };
    },
  },
  methods: {
    ...mapActions(useUserStore, ["loginUser"]),
  },
};
</script>
