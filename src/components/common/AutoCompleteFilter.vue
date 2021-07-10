<template>
  <div class="dropdown autocomplete">
    <div class="dropdown-btn con-input">
      <input type="text" class="input has-icon" />
      <div
        class="icon-input icon-dropdown-box"
        @mousedown.prevent="toggleOption"
      >
        <img src="../../assets/icons/arrow-down-line.png" alt="" />
      </div>
    </div>

    <div class="dropdown-content" :class="{ hide: !isShow }">
      <div class="dropdown-item">item 1</div>
      <div class="dropdown-item">item 2</div>
      <div class="dropdown-item">item 3</div>
      <div class="dropdown-item">item 4</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    toggleOption() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style>
</style>