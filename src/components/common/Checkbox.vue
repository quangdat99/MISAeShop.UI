<template>
  <!-- #region checkbox -->
  <div style="display: inline-block">
    <input type="checkbox" class="checkbox" :id="id" :checked="value" />
    <label :for="id" @click="check(value)"></label>
  </div>
  <!-- #endregion -->
</template>

<script>
//#region export
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  //#region data
  data() {
    return {
      id: Math.random(),
    };
  },
  methods: {
    check(value) {
      setTimeout(() => {
        this.$emit("update:value", !value);
      }, 100);
    },
  },
  //#endregion
};
//#endregion
</script>