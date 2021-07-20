<template>
  <div>
    <div
      v-if="curruntText == '&le;'"
      class="filter-type"
      @click.prevent="toggleOption"
    >
      &le;
    </div>
    <div
      v-else-if="curruntText == '&ge;'"
      class="filter-type"
      @click.prevent="toggleOption"
    >
      &ge;
    </div>
    <div v-else class="filter-type" @click.prevent="toggleOption">
      {{ curruntText }}
    </div>
    <div
      class="dropdown-content"
      ref="autofocus"
      tabindex="0"
      @focusout="closeDropdown"
      v-if="isShow"
    >
      <div
        class="dropdown-item"
        v-for="(option, index) in optionFilter"
        :key="index"
        @click="selectOption(option)"
      >
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Kiểu lọc
     */
    optionFilter: {
      type: Array,
    },
    value: {
      default: null,
    },
  },
  data: () => ({
    /**
     * Hiển thị Dropdown
     */
    isShow: false,
    currunt: 1,
    curruntText: "",
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
    /**
     * Chọn option
     * CreatedBy: dqdat (20/07/2021)
     */
    selectOption(option) {
      this.currunt = option.value;
      this.curruntText = option.prefix;
      this.$emit("update:value", parseInt(option.value));
      this.$emit("updatePaging");

      this.closeDropdown();
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
  mounted() {
    this.curruntText = this.optionFilter[0].prefix;
  },
};
</script>
