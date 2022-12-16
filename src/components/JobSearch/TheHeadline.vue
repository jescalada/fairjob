<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      Fair <span :class="keywordClasses">{{ keyword }}</span>
    </h1>
    <h2 class="text-4xl font-light">
      FairJob: Postings for your peace of mind.
    </h2>
  </section>
</template>

<script>
import nextElementInList from "@/utils/nextElementInList";

export default {
  name: "TheHeadline",
  data() {
    return {
      keyword: "Recruiting",
      interval: null,
    };
  },
  computed: {
    keywordClasses() {
      return {
        [this.keyword.toLowerCase().replaceAll(" ", "")]: true,
      };
    },
  },
  created() {
    this.changeTitle();
  },
  beforeUnmount() {
    // Prevents interval from running forever after the component is unmounted from the DOM
    clearInterval(this.interval);
  },
  methods: {
    changeTitle() {
      // We need to hold a reference to the interval somewhere to clear it later
      this.interval = setInterval(() => {
        const keywords = [
          "Recruiting",
          "Interviewing",
          "Job Searching",
          "Freelancing",
        ];
        this.keyword = nextElementInList(keywords, this.keyword);
      }, 3000);
    },
  },
};
</script>

<style scoped>
.recruiting {
  color: #1a73e8;
}

.interviewing {
  color: #34a853;
}

.jobsearching {
  color: #f9ab00;
}

.freelancing {
  color: #d93025;
}
</style>
