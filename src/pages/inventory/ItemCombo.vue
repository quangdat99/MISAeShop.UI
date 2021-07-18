<template>
  <tr>
    <td>SKU</td>
    <td>Tên</td>
    <td>Đơn vị</td>
    <td>Giá mua</td>
    <td>Giá bán</td>
    <td style="padding-left: 0px; padding-right: 0px; width: 120px">
      <Input :type="'number'" />
    </td>
    <td style="width: 54px; padding: 0px 19px">
      <div class="icon-copy"></div>
    </td>
    <td><Checkbox /></td>
  </tr>
</template>

<script>
import Input from "../../components/common/Input.vue";
import Checkbox from "../../components/common/Checkbox.vue";
export default {
  components: {
    Checkbox,
    Input,
  },
};
</script>

<style>
</style>