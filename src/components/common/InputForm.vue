<template>
  <div
    class="input-form"
    @click="onClickInputForm"
    :class="[focusForm ? 'focus' : '']"
  >
    <div class="item-form" v-for="(item, index) in itemData" :key="index">
      <div class="text-item">{{ item }}</div>
      <div class="icon-item" @click="onClickDeleteItem(item)">
        <img src="../../assets/icons/icon-delete.png" alt="" />
      </div>
    </div>
    <input
      type="text"
      v-model="inputText"
      @focus="focusInputForm"
      @blur="blurInputForm"
      @keydown.enter="enterInput"
    />
  </div>
</template>

<script>
import { removeVietnameseTones } from "../../utils/helper";
export default {
  props: {
    stringData: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      itemData: [],
      focusForm: false,
      inputText: "",
    };
  },
  methods: {
    /**
     * focus ô input
     * CreatedBy: dqdat (20/07/2021)
     */
    focusInputForm() {
      this.focusForm = true;
    },

    /**
     * Blur ô input
     * CreatedBy: dqdat (20/07/2021)
     */
    blurInputForm() {
      this.focusForm = false;
    },

    /**
     * Click vào ô input
     * CreatedBy: dqdat (20/07/2021)
     */
    onClickInputForm() {
      this.focusInputForm();
      this.$el.querySelector("input").focus();
    },

    /**
     * Xóa 1 thành phần
     * CreatedBy: dqdat (20/07/2021)
     */
    onClickDeleteItem(strColor) {
      // let strColor = this.itemData[index];
      let index = this.itemData.indexOf(strColor);
      this.itemData.splice(index, 1);
      let str = this.itemData.join(",");

      this.$emit("update:stringData", str);

      setTimeout(() => {
        this.$emit("delete", strColor.toString());
      }, 100);
    },

    /**
     * Click enter
     * CreatedBy: dqdat (20/07/2021)
     */
    enterInput() {
      this.inputText = this.inputText.trim();
      var isDuplicate = false;
      // Kiểm tra trùng với các giá trị khác
      for (let index = 0; index < this.itemData.length; index++) {
        if (
          removeVietnameseTones(this.inputText.toLowerCase()) ==
          removeVietnameseTones(this.itemData[index].toLowerCase())
        ) {
          isDuplicate = true;
          break;
        }
      }

      if (this.inputText != "" && !isDuplicate) {
        let str = "";
        if (this.stringData == null || this.stringData == "") {
          str = `${this.inputText}`;
        } else {
          str = this.stringData + `,${this.inputText}`;
        }

        this.$emit("update:stringData", str);
        setTimeout(() => {
          this.$emit("change");
        }, 100);
      } else {
        this.inputText = "";
      }
    },
  },
  watch: {
    stringData: function () {
      if (this.inputText != "") {
        this.itemData.push(this.inputText);
      }
      this.inputText = "";
    },
  },
  mounted() {
    // Khởi tạo giá trị dữ liệu
    this.itemData =
      this.stringData != "" && this.stringData != null
        ? this.stringData.split(",")
        : [];
  },
};
</script>

<style>
</style>