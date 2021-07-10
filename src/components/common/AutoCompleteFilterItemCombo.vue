<template>
  <div class="dropdown autocomplete">
    <div class="dropdown-btn con-input">
      <input
        type="text"
        class="input has-icon"
        @focus="$event.target.select()"
      />
      <div
        class="icon-input icon-dropdown-box"
        @mousedown.prevent="toggleOption"
      >
        <img src="../../assets/icons/arrow-down-line.png" alt="" />
      </div>
      <div class="icon-input icon-dropdown-box search">
        <img src="../../assets/icons/Quick-search.png" alt="" />
      </div>
    </div>

    <div class="dropdown-content combo" :class="{ hide: !isShow }">
      <div class="dropdown-item title">
        <div class="sku-code">Mã SKU</div>
        <div class="inventory-name">Tên hàng hóa</div>
      </div>
      <div class="dropdown-item">
        <div class="sku-code">SKU</div>
        <div class="inventory-name">Tên</div>
      </div>
      <div class="dropdown-item">
        <div class="sku-code">SKU</div>
        <div class="inventory-name">Tên</div>
      </div>
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