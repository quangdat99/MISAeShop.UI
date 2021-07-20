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
    /**
     * Thay đổi trạng thái ô checkbox
     * CreatedBy: dqdat (20/07/2021)
     */
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