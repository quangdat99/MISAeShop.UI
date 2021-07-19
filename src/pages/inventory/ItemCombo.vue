<template>
  <tr>
    <td>{{ inventoryItem.skuCode }}</td>
    <td>{{ inventoryItem.inventoryItemName }}</td>
    <td>{{ inventoryItem.unitName }}</td>
    <td>{{ inventoryItem.buyPrice }}</td>
    <td>{{ inventoryItem.costPrice }}</td>
    <td style="padding: 0px; width: 120px">
      <Input
        :type="'number'"
        :value="inventoryItem && inventoryItem.quantity"
        @input="updatequantity"
      />
    </td>
    <td style="width: 54px; padding: 0px 19px; background-color: #fff">
      <div class="icon-copy"></div>
    </td>
    <td style="background-color: #fff"><Checkbox :value="true" /></td>
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
  props: {
    inventoryItem: {
      type: Object,
      default: null,
    },
    indexCombo: {
      type: Number,
      default: null,
    },
    indexData: {
      type: Number,
      default: null,
    },
  },
  methods: {
    /**
     * Cập nhật số lượng hàng hóa combo
     */
    updatequantity(value) {
      this.$emit("updatequantity", value, this.indexData, this.indexCombo);
    },
  },
};
</script>

<style>
</style>