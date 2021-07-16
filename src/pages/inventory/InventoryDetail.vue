<template>
  <div class="dialog">
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="dialog-btn">
          <Button text="Lưu" icon="icon-save" @click="onClickSave" />
        </div>
        <div class="dialog-btn">
          <Button
            text="Lưu và nhân bản"
            icon="icon-saveduplicate"
            color="secondary"
          />
        </div>
        <div class="dialog-btn">
          <Button
            text="Lưu và thêm mới"
            icon="icon-saveadd"
            color="secondary"
          />
        </div>
        <div class="dialog-btn">
          <Button
            text="Hủy bỏ"
            icon="icon-cancle"
            color="secondary"
            @click="onClickCloseDialogInventory"
          />
        </div>
      </div>
      <div class="dialog-body">
        <div class="body-item">
          <div class="label-item">THÔNG TIN CƠ BẢN</div>
          <div class="info-item" v-if="inventoryItem.status">
            <div class="title-item">Trạng thái kinh doanh</div>
            <div style="display: flex; padding-top: 6px">
              <Radio
                name="Đang kinh doanh"
                :value="1"
                :checked="inventoryItem && inventoryItem.status == 1"
                @change="
                  $emit('update:inventoryItem', {
                    ...inventoryItem,
                    status: parseInt($event),
                  })
                "
              />
              <Radio
                name="Ngừng kinh doanh"
                :value="2"
                :checked="inventoryItem && inventoryItem.status == 2"
                @change="
                  $emit('update:inventoryItem', {
                    ...inventoryItem,
                    status: parseInt($event),
                  })
                "
              />
            </div>
          </div>
          <div class="info-item">
            <div class="title-item">
              Tên hàng hóa <span class="require"> *</span>
            </div>
            <Input
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  inventoryItemName: $event,
                })
              "
              style="width: 215px"
              :value="inventoryItem && inventoryItem.inventoryItemName"
              @blur="handleAttributeInventoryItem"
            />
          </div>
          <div class="info-item">
            <div class="title-item">Nhóm hàng hóa</div>
            <AutoComplete
              @update:value="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  inventoryItemCategoryID: $event,
                })
              "
              style="width: 240px"
              :value="inventoryItem && inventoryItem.inventoryItemCategoryID"
              :options="inventoryItemCategorys"
            />
          </div>
          <div class="info-item">
            <div class="title-item">Mã SKU</div>

            <Input
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  skuCode: $event,
                })
              "
              style="width: 240px"
              placeholder="Hệ thống tự sinh khi bỏ trống"
              :value="inventoryItem && inventoryItem.skuCode"
              @blur="handleAttributeInventoryItem"
            />
          </div>
          <div class="info-item">
            <div class="title-item">Mã vạch</div>
            <Input
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  barCode: $event,
                })
              "
              style="width: 240px"
              placeholder="Hệ thống tự sinh khi bỏ trống"
              :value="inventoryItem && inventoryItem.barCode"
            />
          </div>
          <div class="info-item" v-if="isCombo">
            <div class="title-item">Thành phần combo</div>
            <div class="item-combo">
              <div class="item-combo-detail">
                <div class="label-item-combo">
                  <div class="title-item-combo">Thành phần 1: &nbsp;</div>
                  <div class="info-item-combo">
                    Gồm một trong các hàng hóa dưới đây
                  </div>
                </div>
                <div class="filter-item-combo">
                  <AutoCompleteFilterItemCombo
                    style="width: 284px"
                    :value="'2'"
                    :options="[
                      { value: '1', text: 'SKU1', name: 'tên hàng hóa 1' },
                      { value: '2', text: 'SKU2', name: 'tên hàng hóa 2' },
                      { value: '3', text: 'SKU3', name: 'tên hàng hóa 3' },
                    ]"
                  />
                  <Button
                    text="Đồng ý"
                    icon="icon-agree-blue"
                    color="secondary"
                  />
                </div>
                <div class="grid-item-combo">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Mã SKU</th>
                        <th>Tên hàng hóa</th>
                        <th>Đơn vị tính</th>
                        <th>Giá mua</th>
                        <th>Giá bán</th>
                        <th>Số lượng</th>
                        <th></th>
                        <th>Sử dụng</th>
                      </tr>
                    </thead>
                    <tbody>
                      <ItemCombo v-for="n in 4" :key="n" />
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="add-item-combo">
                <Button
                  text="Thêm thành phần"
                  icon="icon-saveadd"
                  color="secondary"
                />
              </div>
            </div>
          </div>
          <div class="info-item" v-if="isInventory">
            <div class="title-item">
              Giá mua <span class="icon icon-question"></span>
            </div>
            <Input
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  buyPrice: $event,
                })
              "
              style="width: 153px"
              type="number"
              :value="inventoryItem && inventoryItem.buyPrice"
            />
          </div>
          <div class="info-item" v-if="isInventory">
            <div class="title-item">Giá bán</div>
            <Input
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  costPrice: $event,
                })
              "
              style="width: 153px"
              type="number"
              :value="inventoryItem && inventoryItem.costPrice"
            />
          </div>
          <div class="info-item" v-if="isCombo">
            <div class="title-item">Giá bán của combo</div>
            <Input
              style="
                width: 124px;
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
              "
              placeholder="Tổng giá mua: 0"
            />
            <Input
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  costPrice: $event,
                })
              "
              style="
                width: 150px;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
              "
              type="number"
              placeholder="0"
              :value="inventoryItem && inventoryItem.costPrice"
            />
          </div>
          <div class="info-item">
            <div class="title-item">Đơn vị tính</div>
            <AutoComplete
              @update:value="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  unitID: $event,
                })
              "
              style="width: 240px"
              :value="inventoryItem && inventoryItem.unitID"
              :options="units"
            />
          </div>
          <div class="info-item" v-if="isInventory">
            <div class="title-item">Tồn kho ban đầu</div>
            <Input
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  firstStock: $event,
                })
              "
              style="width: 101px"
              type="number"
              :value="inventoryItem && inventoryItem.firstStock"
            />
            <div class="note-item">
              Tồn kho ban đầu chỉ được nhập khi thêm mới hàng hóa.
            </div>
          </div>
          <div class="info-item" v-if="isInventory">
            <div class="title-item">Định mức tồn kho</div>
            <div class="label-input-item">
              <div class="title-input-item">Tối thiểu</div>
              <Input
                @input="
                  $emit('update:inventoryItem', {
                    ...inventoryItem,
                    minimumStock: $event,
                  })
                "
                style="width: 70px"
                type="number"
                :value="inventoryItem && inventoryItem.minimumStock"
              />
            </div>
            <div class="label-input-item">
              <div class="title-input-item">Tối đa</div>
              <Input
                @input="
                  $emit('update:inventoryItem', {
                    ...inventoryItem,
                    maximumStock: $event,
                  })
                "
                style="width: 60px"
                type="number"
                :value="inventoryItem && inventoryItem.maximumStock"
              />
            </div>
          </div>
          <div class="info-item" v-if="isInventory || isCombo">
            <div class="title-item">Vị trí lưu trữ trong kho</div>
            <Input
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  stockLocation: $event,
                })
              "
              style="width: 240px"
              :value="inventoryItem && inventoryItem.stockLocation"
            />
          </div>
          <div class="info-item" v-if="isInventory || isCombo">
            <div class="title-item">Vĩ trí trưng bày</div>
            <Input
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  showLocation: $event,
                })
              "
              style="width: 240px"
              :value="inventoryItem && inventoryItem.showLocation"
            />
          </div>
          <div class="info-item check">
            <Checkbox :value.sync="ShowInMenu" />
            <div class="label-checkbox">Hiển thị trên bàn hình bán hàng</div>
            <span class="icon icon-question"></span>
          </div>
        </div>
        <div class="body-item">
          <div class="label-item">THÔNG TIN THUỘC TÍNH</div>
          <div class="info-item">
            <div class="title-item">Thuộc tính</div>
            <div class="label-input-item">
              <div class="title-input-item" style="width: 137px">Màu sắc</div>
              <!-- <Input style="width: 295px" placeholder="Xanh, Đỏ, Vàng..." /> -->
              <InputForm
                :stringData="inventoryItem.color"
                @update:stringData="
                  $emit('update:inventoryItem', {
                    ...inventoryItem,
                    color: $event,
                  })
                "
                @change="handleAttributeInventoryItem"
              />
            </div>
          </div>

          <div class="info-item">
            <div class="title-item">Chi tiết thuộc tính</div>
            <div class="item-detail-grid">
              <table class="table">
                <thead>
                  <tr>
                    <th>Tên hàng hóa</th>
                    <th>Mã SKU</th>
                    <th>Mã vạch</th>
                    <th>Giá mua</th>
                    <th>Giá bán</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <ItemDetail
                    v-for="(item, index) in itemDetails"
                    :key="index"
                    :inventoryItem="item"
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="body-item">
          <div class="label-item">THÔNG TIN BỔ SUNG</div>
          <div class="info-item" v-if="isInventory">
            <div class="title-item">Trọng lượng gói hàng (g)</div>
            <Input
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  weight: $event,
                })
              "
              style="width: 243px"
              :value="inventoryItem && inventoryItem.weight"
            />
          </div>
          <div class="info-item" v-if="isInventory">
            <div class="title-item">Kích thước đóng gói (cm)</div>
            <Input
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  length: $event,
                })
              "
              style="
                width: 77px;
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
              "
              placeholder="Chiều dài"
              :value="inventoryItem && inventoryItem.length"
            />
            <Input
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  width: $event,
                })
              "
              style="width: 87px; border-radius: 0px"
              placeholder="Chiều rộng"
              :value="inventoryItem && inventoryItem.width"
            />
            <Input
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  height: $event,
                })
              "
              style="
                width: 79px;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
              "
              placeholder="Chiều cao"
              :value="inventoryItem && inventoryItem.height"
            />
          </div>
          <div class="info-item">
            <div class="title-item">Mô tả</div>
            <Textarea
              style="width: 438px; height: 80px"
              :value="inventoryItem && inventoryItem.description"
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  description: $event,
                })
              "
            />
          </div>
          <div class="info-item">
            <div class="title-item">Ảnh hàng hóa</div>
            <div class="layout-item">
              <div class="option-item">
                <div class="btn-option">
                  <div class="option-icon icon icon-choose"></div>
                  <div class="option-text">Biểu tượng</div>
                </div>
              </div>
              <div class="image-item">
                <img src="../../assets/images/Image.jpg" alt="" />
              </div>
              <div class="up-image-item">
                <div class="btn-primary">...</div>
              </div>
            </div>
            <div class="note-item" style="color: #9e9e9e">
              - Lựa chọn biểu tượng để thay thế nếu không có ảnh
              <br />
              <br />
              - Định dạng ảnh (.jpg, .jpeg, .png, .gif) và dung lượng &#60; 5MB
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <div class="dialog-btn">
          <Button text="Lưu" icon="icon-save" @click="onClickSave" />
        </div>
        <div class="dialog-btn">
          <Button
            text="Lưu và nhân bản"
            icon="icon-saveduplicate"
            color="secondary"
          />
        </div>
        <div class="dialog-btn">
          <Button
            text="Lưu và thêm mới"
            icon="icon-saveadd"
            color="secondary"
          />
        </div>
        <div class="dialog-btn">
          <Button
            text="Hủy bỏ"
            icon="icon-cancle"
            color="secondary"
            @click="onClickCloseDialogInventory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertString } from "../../utils/helper";
import { getInventoryItemCategorys } from "../../api/inventoryItemCategory.js";
import { getUnits } from "../../api/unit.js";

import ItemCombo from "../inventory/ItemCombo.vue";
import ItemDetail from "../inventory/ItemDetail.vue";

import Radio from "../../components/common/Radio.vue";
import Checkbox from "../../components/common/Checkbox.vue";
import Button from "../../components/common/Button.vue";
import Input from "../../components/common/Input.vue";
import Textarea from "../../components/common/Textarea.vue";
import AutoComplete from "../../components/common/AutoComplete.vue";
import AutoCompleteFilterItemCombo from "../../components/common/AutoCompleteFilterItemCombo.vue";
import InputForm from "../../components/common/InputForm.vue";

export default {
  components: {
    ItemCombo,
    ItemDetail,
    Button,
    Input,
    Textarea,
    AutoComplete,
    AutoCompleteFilterItemCombo,
    Checkbox,
    Radio,
    InputForm,
  },
  props: {
    /**
     * Là hàng hóa
     */
    isInventory: {
      type: Boolean,
      default: false,
    },
    /**
     * Là dịch vụ
     */
    isService: {
      type: Boolean,
      default: false,
    },
    /**
     * Là combo
     */
    isCombo: {
      type: Boolean,
      default: false,
    },
    /**
     * hàng hóa
     */
    inventoryItem: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      itemDetails: [], // Thành phần thuộc tính hàng hóa (màu sắc)
      inventoryItemCategorys: [], // Dữ liệu nhóm hàng hóa
      units: [], // Dữ liệu đơn vị tính
    };
  },
  created() {
    this.getInventoryItemCategorys();
    this.getUnits();
  },
  methods: {
    /**
     * Lấy dữ liệu Nhóm hàng hóa
     */
    getInventoryItemCategorys() {
      getInventoryItemCategorys().then((res) => {
        if (res.statusCode == 200 || res.statusCode == 204) {
          res.data.forEach((item) => {
            this.inventoryItemCategorys.push({
              value: item.inventoryItemCategoryID,
              text: item.inventoryItemCategoryName,
            });
          });
        }
      });
    },
    /**
     * Lấy dữ liệu đơn vị tính
     */
    getUnits() {
      getUnits().then((res) => {
        if (res.statusCode == 200 || res.statusCode == 204) {
          res.data.forEach((item) => {
            this.units.push({
              value: item.unitID,
              text: item.unitName,
            });
          });
        }
      });
    },
    /**
     * Click đóng dialog
     */
    onClickCloseDialogInventory() {
      this.$emit("closeDialogInventory");
    },
    /**
     * Click Lưu
     */
    onClickSave() {
      this.$emit("onSave");
    },
    /**
     * Xử lý chi tiết thuộc tính hàng hóa
     */
    handleAttributeInventoryItem() {
      // console.log(this.inventoryItem.color);
      this.itemDetails = [];
      let arrColor = [];
      if (this.inventoryItem.color == null || this.inventoryItem.color == "") {
        this.inventoryItem.color = "";
        arrColor = [];
      } else if (this.inventoryItem.color.includes(",") == false) {
        arrColor.push(this.inventoryItem.color);
      } else {
        arrColor = this.inventoryItem.color.split(",");
      }

      for (let i = 0; i < arrColor.length; i++) {
        var subColor = convertString(arrColor[i], "color");
        var itemDetail = {};
        if (this.inventoryItem.inventoryItemName) {
          itemDetail.inventoryItemName = `${this.inventoryItem.inventoryItemName} (${arrColor[i]})`;
        } else {
          itemDetail.inventoryItemName = `(${arrColor[i]})`;
        }
        if (this.inventoryItem.skuCode) {
          itemDetail.skuCode = `${this.inventoryItem.skuCode}-${subColor}`;
        } else {
          itemDetail.skuCode = `${subColor}`;
        }

        this.itemDetails.push(itemDetail);
      }
    },
  },
  // computed: {
  //   updateAttributeInventoryITem: function () {
  //     console.log("change");
  //     return [
  //       this.inventoryItem.color,
  //       this.inventoryItem.inventoryItemName,
  //       this.inventoryItem.skuCode,
  //     ].join();
  //   },
  // },
  // watchs: {
  //   "inventoryItem.color": function () {
  //     this.handleAttributeInventoryItem();
  //   },
  //   "inventoryItem.inventoryItemName": function () {
  //     console.log("change name");
  //     this.handleAttributeInventoryItem();
  //   },
  //   "inventoryItem.skuCode": function () {
  //     this.handleAttributeInventoryItem();
  //   },
  // },
  mounted() {
    this.handleAttributeInventoryItem();
  },
  computed: {
    ShowInMenu: {
      get: function () {
        if (this.inventoryItem.showInMenu == 1) {
          return true;
        } else if (this.inventoryItem.showInMenu == 2) {
          return false;
        } else return false;
      },
      set: function (value) {
        if (value == true) {
          this.inventoryItem.showInMenu = 1;
        } else {
          this.inventoryItem.showInMenu = 2;
        }
      },
    },
  },
};
</script>

<style>
</style>