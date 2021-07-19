<template>
  <div class="dropdown autocomplete">
    <div class="dropdown-btn con-input">
      <input
        type="text"
        class="input has-icon"
        @focus="$event.target.select()"
        :value="valueInput"
        v-bind="inputAttributes"
        @blur="onBlur"
        @keydown.up.prevent="up"
        @keydown.down.prevent="down"
        @keydown.enter.prevent="enter"
        @input="onInput"
      />
      <div
        class="icon-input icon-dropdown-box"
        @mousedown.prevent="toggleOption"
      >
        <img src="../../assets/icons/arrow-down-line.png" alt="" />
      </div>
      <div class="icon-input icon-dropdown-box add">
        <img src="../../assets/icons/quick-add.png" alt="" />
      </div>
    </div>

    <div class="dropdown-content" :class="{ hide: !isShow }">
      <div
        v-for="(option, i) in optionData"
        :key="i"
        class="dropdown-item"
        :class="{ active: current == i }"
        @click.prevent="clickoption(option, i)"
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
     * Danh sách option của AutoComplete
     */
    options: {
      type: Array,
      require: true,
      default: null,
    },

    /**
     * Giá trị khởi tạo cho input
     */
    value: {
      type: String,
      default: "",
    },
    /**
     * Attribute thêm cho input
     */
    inputAttributes: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      /**
       * Xác định trạng thái popup AutoComplete
       */
      isShow: false,
      /**
       * vị trí hiện tại
       */
      current: 0,

      /**
       * Danh sách option của AutoComplete có lọc
       */
      optionData: [],

      /**
       * Giá trị của input
       */
      valueInput: "",
    };
  },
  methods: {
    /**
     * Thay đổi trạng thái popup
     */
    toggleOption() {
      if (this.isShow) {
        this.isShow = false;
        this.$el.querySelector("input").blur();
      } else {
        this.getCurrent();
        this.showOption();
      }
    },
    /**
     * Hiển thị popup
     * CreatedBy: dqdat (11/6/2021)
     */
    showOption() {
      this.$el.querySelector("input").focus();
      this.isShow = true;
    },

    /**
     * Nhấn enter
     * CreatedBy: dqdat (11/6/2021)
     */
    enter() {
      // this.$emit("update:value", this.optionData[this.current].value);
      this.valueInput = this.optionData[this.current].text;
      var res = this.options.find((s) => s.text == this.valueInput);
      if (res) {
        this.$emit("update:value", res.value);
      } else {
        if (this.valueInput) {
          this.$emit("update:value", "");
        } else {
          this.$emit("update:value", null);
        }
      }
      this.isShow = false;
      // this.$el.querySelector("input").blur();
    },

    /**
     * Nhấn up
     * CreatedBy: dqdat (11/6/2021)
     */
    up() {
      if (!this.isShow) {
        this.getCurrent();
        this.showOption();
      } else {
        if (this.current > 0) this.current--;
        this.valueInput = this.optionData[this.current].text;
      }
    },

    /**
     * Nhấn down
     * CreatedBy: dqdat (11/6/2021)
     */
    down() {
      if (!this.isShow) {
        this.getCurrent();
        this.showOption();
      } else {
        if (this.current < this.optionData.length - 1) this.current++;
        this.valueInput = this.optionData[this.current].text;
      }
    },

    /**
     * Chọn một option
     * CreatedBy: dqdat (11/6/2021)
     */
    clickoption(option, index) {
      this.current = index;
      this.isShow = false;
      this.$emit("update:value", option.value);
      this.valueInput = option.text;
    },

    /**
     * Blur input
     * CreatedBy: dqdat (11/6/2021)
     */
    onBlur() {
      var res = this.options.find((s) => s.text == this.valueInput);
      if (res) {
        this.$emit("update:value", res.value);
      } else {
        if (this.valueInput) {
          this.$emit("update:value", "");
        } else {
          this.$emit("update:value", null);
        }
      }

      setTimeout(() => {
        this.isShow = false;
        this.$emit("blur");
      }, 300);
    },

    /**
     * Nhập vào input
     * CreatedBy: dqdat (11/6/2021)
     */
    onInput(e) {
      let val = e.target.value;
      this.valueInput = val;
      this.current = 0;
      if (this.options) {
        this.optionData = this.options.filter((s) =>
          s.text.toLowerCase().includes(val.toLowerCase())
        );
        this.isShow = true;
      }
    },
    getCurrent() {
      // Khởi tạo dữ liệu Options
      this.optionData = this.options;

      // Khởi tạo trạng thái active option ban đầu
      let index = this.optionData.findIndex((s) => s.value == this.value);
      if (index >= 0) {
        this.current = index;
        this.valueInput = this.optionData[this.current].text;
      } else {
        this.current = 0;
        this.valueInput = "";
      }
    },
  },
  watch: {
    options: function () {
      this.getCurrent();
    },
  },
};
</script>

