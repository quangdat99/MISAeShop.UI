<template>
  <!-- #region dialog loading -->
  <div class="dialog">
    <div class="dialog-background">
      <div class="dialog-content"></div>
      <div>Đang lấy dữ liệu...</div>
    </div>
  </div>
  <!-- #endregion -->
</template>

<script>
//#region  export
export default {};
//#endregion
</script>

<style lang="scss" scoped>
/* #region css */
.dialog {
  bottom: 61px;
  left: 159px;
  top: 169px;
  right: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000042;
  .dialog-background {
    width: 130px;
    height: 65px;
    background-color: #d0d0d0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .dialog-content {
      width: 35px;
      height: 35px;
      position: relative;
      background-size: contain;
      background: url("../../assets/images/Spinner-1.1s-44px.svg") no-repeat;
      margin-bottom: 5px;
      margin-right: 8px;
    }
  }
}
</style>