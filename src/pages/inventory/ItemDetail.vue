<template>
  <tr>
    <td>{{ inventory.inventoryItemName }}</td>
    <td>{{ inventory.skuCode }}</td>
    <td>Mã vạch</td>
    <td>Giá mua</td>
    <td>Giá bán</td>
    <td style="width: 54px; padding: 0px 19px">
      <div class="icon-copy"></div>
    </td>
    <td style="width: 54px; padding: 0px 19px">
      <div class="icon icon-delete" @click="onClickDeleteItemDetail"></div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    inventory: {
      type: Object,
      default: Object,
    },
  },
  methods: {
    onClickDeleteItemDetail() {},
  },
};
</script>

<style>
</style>