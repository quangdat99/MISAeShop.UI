<template>
  <!-- #region input -->
  <input
    class="input"
    :class="{ 'has-icon': hasIcon, 'read-only': isReadonly }"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @blur="$emit('blur')"
    @focus="$event.target.select()"
    :readonly="isReadonly"
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
    /**
     * Trang thái input
     */
    isReadonly: {
      type: Boolean,
      default: false,
    },
  },

  //#endregion
};
//#endregion
</script>