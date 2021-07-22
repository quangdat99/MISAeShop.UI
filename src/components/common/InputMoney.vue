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
    this.displayValue = this.value;
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
  methods: {
    /**
     *lấy giá trị tiền gửi ra cho componet cha
     */
    getValue() {
      this.$emit("input", parseInt(this.displayValue));
    },
  },
  watch: {
    /**
     *kiểm tra khi giá trị đầu vào thay đổi thì cập nhật
     */
    displayValue() {
      this.$emit("input", parseInt(this.displayValue));
    },
    // value: function (value) {
    //   this.displayValue = value;
    // },
  },
};
</script>

<style>
</style>