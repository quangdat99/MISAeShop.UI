<template>
  <!-- #region input -->
  <textarea
    class="input"
    :class="{ 'has-icon': hasIcon }"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @blur="$emit('blur')"
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
      type: String,
      default: "",
    },
  },
  //#endregion
};
//#endregion
</script>