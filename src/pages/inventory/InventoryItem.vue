<template>
  <tr>
    <td><Checkbox :value.sync="inventoryItem.isSelect" /></td>
    <td>{{ inventoryItem.skuCode }}</td>
    <td class="click" @click="$emit('click', inventoryItem)">
      {{ inventoryItem.inventoryItemName }}
    </td>
    <td>{{ inventoryItem.inventoryItemCategoryName }}</td>
    <td>{{ inventoryItem.unitName }}</td>
    <td style="text-align: end">{{ CostPrice }}</td>
    <td>{{ ShowInMenu }}</td>
    <td>{{ InventoryItemType }}</td>
    <td>{{ ManageType }}</td>
    <td>{{ Status }}</td>
  </tr>
</template>

<script>
import Checkbox from "../../components/common/Checkbox.vue";
export default {
  components: {
    Checkbox,
  },
  props: {
    /**
     * Hàng hóa
     */
    inventoryItem: {
      type: Object,
    },
  },
  data() {
    return {
      isSelect: false,
    };
  },

  watch: {
    "inventoryItem.isSelect": function () {
      this.$emit(
        "select",
        this.inventoryItem.inventoryItemID,
        this.inventoryItem.isSelect
      );
    },
  },

  computed: {
    // Hiển thị trên màn hình bán hàng
    ShowInMenu: function () {
      if (this.inventoryItem.showInMenu == 1) {
        return "Có";
      } else if (this.inventoryItem.showInMenu == 2) {
        return "Không";
      }
      return "Không xác định";
    },

    // Trạng thái kinh doanh
    Status: function () {
      if (this.inventoryItem.status == 1) {
        return "Đang kinh doanh";
      } else if (this.inventoryItem.status == 2) {
        return "Ngừng kinh doanh";
      }
      return "Không xác định";
    },

    // Loại hàng hóa
    InventoryItemType: function () {
      if (this.inventoryItem.inventoryItemType == 1) {
        return "Hàng hóa";
      } else if (this.inventoryItem.inventoryItemType == 2) {
        return "Dịch vụ";
      } else if (this.inventoryItem.inventoryItemType == 3) {
        return "Combo";
      }
      return "Không xác định";
    },

    // Quản lý theo
    ManageType: function () {
      if (this.inventoryItem.manageType == 1) {
        return "Khác";
      } else if (this.inventoryItem.manageType == 2) {
        return "Lô/ Hạn sử dụng";
      } else if (this.inventoryItem.manageType == 3) {
        return "Serial/ IMEI";
      }
      return "Không xác định";
    },

    // Giá bán
    CostPrice: function () {
      try {
        return this.inventoryItem.costPrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      } catch (error) {
        return this.inventoryItem.costPrice;
      }
    },
  },
};
</script>

<style>
</style>