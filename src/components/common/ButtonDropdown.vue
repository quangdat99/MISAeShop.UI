<template>
  <div>
    <div :class="['btn', color ? 'btn-' + color : '']">
      <div :class="['btn-icon icon', icon ? icon : '']"></div>
      <div class="btn-text">{{ text }}</div>
      <div class="btn-option">
        <div class="option-icon"></div>
      </div>
    </div>
    <div class="dropdown-content" :class="{ hide: !isShow }">
      <div class="dropdown-item">Thêm mới hàng hóa</div>
      <div class="dropdown-item">Thêm mới combo</div>
      <div class="dropdown-item">Thêm mới dịch vụ</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Background color của button.
     */
    color: {
      type: String,
      default: "primary",
    },

    /**
     * Text hiển thị của button.
     */
    text: {
      type: String,
      default: "text",
    },

    /**
     * Icon hiển thị cho button
     */
    icon: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    /**
     * Hiển thị Dropdown
     */
    isShow: false,
  }),
};
</script>

<style>
</style>