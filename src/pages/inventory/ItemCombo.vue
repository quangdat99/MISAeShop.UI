<template>
  <tr>
    <td>SKU</td>
    <td>Tên</td>
    <td>Đơn vị</td>
    <td>Giá mua</td>
    <td>Giá bán</td>
    <td>số lượng</td>
    <td style="width: 54px; padding: 0px 19px">
      <div class="icon-copy"></div>
    </td>
    <td><Checkbox /></td>
  </tr>
</template>

<script>
import Checkbox from "../../components/common/Checkbox.vue";
export default {
  components: {
    Checkbox,
  },
};
</script>

<style>
</style>