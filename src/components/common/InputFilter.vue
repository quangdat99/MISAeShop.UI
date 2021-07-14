<template>
  <!-- #region input -->
  <input
    class="input"
    :class="{ 'has-icon': hasIcon }"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @blur="updateInputFilter($event.target.value)"
    @keydown.prevent.enter="updateInputFilter($event.target.value)"
    @focus="$event.target.select()"
  />
  <!-- #endregion -->
</template>

<script>
//#region export
export default {
  //#region props
  props: {
    /**
     * Xác định có icon không
     */
    hasIcon: {
      type: Boolean,
      default: false,
    },

    /**
     * Placeholder của input
     */
    placeholder: {
      type: String,
      default: "",
    },

    /**
     * Type của input
     */
    type: {
      type: String,
      default: "text",
    },

    /**
     * Giá trị của input
     */
    value: {
      default: null,
    },
  },
  methods: {
    updateInputFilter(value) {
      if (this.type == "text") {
        value = value.toString();
      } else if (this.type == "number") {
        value = parseInt(value);
      }
      if (value != this.value) {
        this.$emit("update:value", value);
        this.$emit("updatePaging");
      }
    },
  },
  //#endregion
};
//#endregion
</script>