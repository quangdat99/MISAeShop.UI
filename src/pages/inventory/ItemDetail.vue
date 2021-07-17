<template>
  <tr>
    <td>
      <Input
        @input="
          $emit(
            'updateItemDetail',
            {
              ...inventoryItem,
              inventoryItemName: $event,
            },
            index,
            'inventoryItemName'
          )
        "
        readonly
        :value="inventoryItem && inventoryItem.inventoryItemName"
      />
    </td>
    <td style="width: 220px">
      <Input
        @input="
          $emit(
            'updateItemDetail',
            {
              ...inventoryItem,
              skuCode: $event,
            },
            index,
            'skuCode'
          )
        "
        readonly
        :value="inventoryItem && inventoryItem.skuCode"
      />
    </td>
    <td style="width: 180px">
      <Input
        @input="
          $emit(
            'updateItemDetail',
            {
              ...inventoryItem,
              barCode: $event,
            },
            index,
            'barCode'
          )
        "
        :value="inventoryItem && inventoryItem.barCode"
      />
    </td>
    <td style="width: 100px">
      <Input
        @input="
          $emit(
            'updateItemDetail',
            {
              ...inventoryItem,
              buyPrice: $event,
            },
            index,
            'buyPrice'
          )
        "
        :value="inventoryItem && inventoryItem.buyPrice"
        :type="'number'"
      />
    </td>
    <td style="width: 100px">
      <Input
        @input="
          $emit(
            'updateItemDetail',
            {
              ...inventoryItem,
              costPrice: $event,
            },
            index,
            'costPrice'
          )
        "
        :value="inventoryItem && inventoryItem.costPrice"
        :type="'number'"
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
    index: {
      type: Number,
      default: null,
    },
    inventoryItem: {
      type: Object,
      default: Object,
    },
  },
  methods: {
    onClickDeleteItemDetail() {
      this.$emit("delete", this.inventoryItem.color.toString());
    },
  },
};
</script>

<style>
</style>