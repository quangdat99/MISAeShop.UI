<template>
  <Money
    class="input money"
    v-bind="money"
    v-model="displayValue"
    :class="{ 'read-only': isReadonly }"
    :readonly="isReadonly"
  />
</template>

<script>
import { Money } from "v-money";
export default {
  components: {
    Money,
  },
  mounted() {
    setTimeout(() => {
      this.displayValue = this.value;
    }, 200);
  },

  props: {
    /**
     *nhận giá trị tiền gửi vào
     */
    value: { type: Number, default: 0 },
    /**
     * Trang thái input
     */
    isReadonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**
       *Giá trị hiển thị trên input
       */
      displayValue: 0,
      /**
       *định nghĩa kiểu hiển thị
       */
      money: {
        thousands: ".",
        precision: 0,
      },
    };
  },
  watch: {
    /**
     *kiểm tra khi giá trị đầu vào thay đổi thì cập nhật
     */
    displayValue() {
      this.$emit("input", parseInt(this.displayValue));
    },
  },
};
</script>

<style>
</style>