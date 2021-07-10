<template>
  <div
    :class="['btn', color ? 'btn-' + color : '']"
    @click.prevent="$emit('click')"
  >
    <div class="btn-icon"><div :class="['icon', icon ? icon : '']"></div></div>

    <div class="btn-text">{{ text }}</div>
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
};
</script>

<style>
</style>