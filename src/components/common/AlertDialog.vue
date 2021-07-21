<template>
  <div class="alert-dialog">
    <div class="alert-dialog-background"></div>
    <div class="alert-dialog-content" style="width: 400px">
      <div class="alert-dialog-header">
        <div class="header-left">MISA eShop</div>
        <div
          class="header-right-btn"
          @click="closeDialog"
          content="Close dialog"
          v-tippy="{
            placement: 'bottom-end',
            followCursor: true,
          }"
        ></div>
      </div>
      <div class="alert-dialog-body">
        <div class="body-icon" :class="classType"></div>
        <div class="body-message" v-html="msg">
          <!-- Mã SKU Q01 đã tồn tại trong hệ thống. Vui lòng kiểm tra lại. -->
        </div>
      </div>
      <div class="alert-dialog-footer">
        <Button text="Đồng ý" @click="closeDialog" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../common/Button.vue";
export default {
  components: {
    Button,
  },
  props: {
    /**
     * Lời nhắn
     */
    msg: {
      type: String,
      default: "",
    },

    /**
     * Loại dialog alert
     * warning, error
     */
    type: {
      type: String,
      required: true,
      default: "warning",
    },
  },
  //#region computed
  computed: {
    classType: function () {
      if (this.type == "warning") return "icon-warning";
      if (this.type == "error") return "icon-error";
      if (this.type == "question") return "icon-question";

      return "";
    },
  },
  //#endregion
  //#region methods
  methods: {
    /**
     * Hàm thực hiện đóng dialog thông báo.
     * CreatedBy: dqdat (11/6/2021)
     */
    closeDialog() {
      this.$emit("onClose");
    },
  },
  //#endregion
};
</script>

<style lang="scss" scoped>
.alert-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .alert-dialog-background {
    position: absolute;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    height: 100%;
  }
  .alert-dialog-content {
    background-color: #fff;
    position: relative;
    border-radius: 3px;
    border: 2px solid #dfdfdf;
    .alert-dialog-header {
      height: 40px;
      display: flex;
      background-color: #f0f0f0 !important;
      padding: 10px 14px;
      .header-left {
        font: 600 16px Roboto !important;
        color: #212121;
      }
      .header-right-btn {
        margin-left: auto;
        height: 16px;
        width: 16px;
        cursor: pointer;
        background-size: contain;
        background: url("../../assets/images/common-icon.png") no-repeat -1102px -153px;
      }
    }
    .alert-dialog-body {
      border-top: 1px solid #dfdfdf;
      padding: 10px;
      display: flex;

      .body-icon {
        height: 44px;
        width: 44px;

        &.icon-warning {
          background: url("../../assets/images/icon-popup.png") no-repeat -57px -4px;
        }
        &.icon-error {
          background: url("../../assets/images/icon-popup.png") no-repeat -110px -3px;
        }
      }
      .body-message {
        margin-left: 10px;
        max-width: 300px;
      }
    }
    .alert-dialog-footer {
      padding: 8px;
      border-top: 1px solid #dfdfdf;
      display: flex;
      flex-direction: row-reverse;
      .btn {
        width: 73px;
        border-radius: 3px;
        height: 32px;
      }
    }
  }
}
</style>