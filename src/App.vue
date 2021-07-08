<template>
  <div>
    <TheNavbar />
    <TheHeader />
    <TheContent />
  </div>
</template>

<script>
import TheNavbar from "./layouts/TheNavbar.vue";
import TheHeader from "./layouts/TheHeader.vue";
import TheContent from "./layouts/TheContent.vue";

export default {
  name: "App",
  components: {
    TheNavbar,
    TheHeader,
    TheContent,
  },
};
</script>

<style lang="scss">
@import "./css/Style.scss";
</style>
