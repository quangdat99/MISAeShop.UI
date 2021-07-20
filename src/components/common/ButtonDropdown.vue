<template>
  <div>
    <div :class="['btn', color ? 'btn-' + color : '']">
      <div class="btn-icon" @click.prevent="$emit('click', 1)">
        <div :class="['icon', icon ? icon : '']"></div>
      </div>

      <div class="btn-text" @click.prevent="$emit('click', 1)">{{ text }}</div>
      <div class="btn-option" @click.prevent="toggleOption">
        <div class="option-icon"></div>
      </div>
    </div>
    <div
      class="dropdown-content"
      ref="autofocus"
      tabindex="0"
      @focusout="closeDropdown"
      v-if="isShow"
    >
      <div class="dropdown-item" @click.prevent="$emit('click', 1)">
        Thêm mới hàng hóa
      </div>
      <div class="dropdown-item" @click.prevent="$emit('click', 3)">
        Thêm mới combo
      </div>
      <div class="dropdown-item" @click.prevent="$emit('click', 2)">
        Thêm mới dịch vụ
      </div>
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
  methods: {
    /**
     * Thay đổi trạng thái dropdown
     * CreatedBy: dqdat (20/07/2021)
     */
    toggleOption() {
      this.isShow = !this.isShow;
    },
    /**
     * Đóng dropdown
     * CreatedBy: dqdat (20/07/2021)
     */
    closeDropdown() {
      setTimeout(() => {
        this.isShow = false;
      }, 200);
    },
  },
  watch: {
    isShow: function () {
      if (this.isShow) {
        setTimeout(() => {
          this.$refs.autofocus.focus();
        }, 100);
      }
    },
  },
};
</script>

<style>
</style>