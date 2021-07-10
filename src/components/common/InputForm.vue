<template>
  <div
    class="input-form"
    @click="onClickInputForm"
    :class="[focusForm ? 'focus' : '']"
  >
    <div class="item-form" v-for="(item, index) in itemData" :key="index">
      <div class="text-item">{{ item }}</div>
      <div class="icon-item">
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
    focusInputForm() {
      this.focusForm = true;
    },
    blurInputForm() {
      this.focusForm = false;
    },
    onClickInputForm() {
      this.focusInputForm();
      this.$el.querySelector("input").focus();
    },
    enterInput() {
      this.inputText = this.inputText.trim();
      var isDuplicate = false;
      // Kiểm tra trùng với các giá trị khác
      for (let index = 0; index < this.itemData.length; index++) {
        if (
          this.inputText.toLowerCase() == this.itemData[index].toLowerCase()
        ) {
          isDuplicate = true;
          break;
        }
      }

      if (this.inputText != "" && !isDuplicate) {
        let str = this.stringData + `/${this.inputText}`;
        this.$emit("update:stringData", str);
      } else {
        this.inputText = "";
      }
    },
  },
  watch: {
    stringData: function () {
      this.itemData.push(this.inputText);
      this.inputText = "";
    },
  },
  mounted() {
    this.itemData = this.stringData.split("/");
  },
};
</script>

<style>
</style>