<template>
  <!-- #region radio -->
  <div style="display: flex">
    <input
      type="radio"
      :id="id"
      class="radio"
      :value="value"
      :checked="checked"
      @input="$emit('change', $event.target.value)"
    />
    <label :for="id"></label>
    <label
      :for="id"
      style="margin-left: 8px; font-size: 13px; margin-right: 16px"
      >{{ name }}</label
    >
  </div>
  <!-- #endregion -->
</template>

<script>
//#region export
export default {
  //#region props
  props: {
    // index: {
    //   type: String,
    //   default: "1",
    // },
    /**
     * name của radio
     * CreatedBy: dqdat (11/6/2021)
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * Giá trị của radio
     * CreatedBy: dqdat (11/6/2021)
     */
    value: {
      type: Number,
      required: true,
    },

    /**
     * Xác định radio có được check hay không
     * CreatedBy: dqdat (11/6/2021)
     */
    checked: {
      type: Boolean,
      default: null,
    },
  },
  //#endregion

  //#region data
  data() {
    return {
      id: Math.random(),
    };
  },
  //#endregion
};
//#endregion
</script>