<template>
  <tr>
    <td>
      <Input
        @input="
          $emit('update:inventoryItem', {
            ...inventoryItem,
            inventoryItemName: $event,
          })
        "
        :value="inventoryItem && inventoryItem.inventoryItemName"
      />
    </td>
    <td style="width: 220px">
      <Input
        @input="
          $emit('update:inventoryItem', {
            ...inventoryItem,
            skuCode: $event,
          })
        "
        :value="inventoryItem && inventoryItem.skuCode"
      />
    </td>
    <td style="width: 180px">
      <Input
        @input="
          $emit('update:inventoryItem', {
            ...inventoryItem,
            barCode: $event,
          })
        "
        :value="inventoryItem && inventoryItem.barCode"
      />
    </td>
    <td style="width: 100px">
      <Input
        @input="
          $emit('update:inventoryItem', {
            ...inventoryItem,
            buyPrice: $event,
          })
        "
        :value="inventoryItem && inventoryItem.buyPrice"
      />
    </td>
    <td style="width: 100px">
      <Input
        @input="
          $emit('update:inventoryItem', {
            ...inventoryItem,
            costPrice: $event,
          })
        "
        :value="inventoryItem && inventoryItem.costPrice"
      />
    </td>
    <td style="width: 54px; padding: 0px 19px">
      <div class="icon-copy"></div>
    </td>
    <td style="width: 54px; padding: 0px 19px">
      <div class="icon icon-delete" @click="onClickDeleteItemDetail"></div>
    </td>
  </tr>
</template>

<script>
import Input from "../../components/common/Input.vue";
export default {
  components: {
    Input,
  },
  props: {
    inventoryItem: {
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