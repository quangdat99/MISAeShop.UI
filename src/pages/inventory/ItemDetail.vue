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
      <InputMoney
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
      />
    </td>
    <td style="width: 100px">
      <InputMoney
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
import InputMoney from "../../components/common/InputMoney.vue";
export default {
  components: {
    Input,
    InputMoney,
  },
  props: {
    /**
     * chỉ số
     */
    index: {
      type: Number,
      default: null,
    },
    /**
     * hàng hóa
     */
    inventoryItem: {
      type: Object,
      default: Object,
    },
  },
  methods: {
    /**
     * Xóa hàng hóa chi tiết
     * CreatedBy: dqdat (20/07/2021)
     */
    onClickDeleteItemDetail() {
      this.$emit("delete", this.inventoryItem.color.toString());
    },
  },
};
</script>

<style>
</style>