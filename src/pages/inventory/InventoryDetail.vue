<template>
  <div class="dialog">
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="dialog-btn">
          <Button
            text="Lưu"
            icon="icon-save"
            @click="onClickSave"
            content="Ctrl + S"
            v-tippy="{
              placement: 'bottom-end',
              followCursor: true,
            }"
          />
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
            content="Ctrl + B"
            v-tippy="{
              placement: 'bottom-end',
              followCursor: true,
            }"
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
              ref="inputInventoryItemName"
              @input="
                $emit('update:inventoryItem', {
                  ...inventoryItem,
                  inventoryItemName: $event,
                })
              "
              style="width: 215px"
              :value="inventoryItem && inventoryItem.inventoryItemName"
              @blur="onBlurInputName"
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
              @blur="onBlurInputSKUCode"
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
              <div
                class="item-combo-detail"
                v-for="(combo, index) in itemCombo"
                :key="index"
              >
                <div class="label-item-combo">
                  <div class="title-item-combo">
                    Thành phần {{ index + 1 }}: &nbsp;
                  </div>
                  <div class="info-item-combo">
                    Gồm một trong các hàng hóa dưới đây
                  </div>
                  <div
                    class="delete-item-combo"
                    @click="deleteItemCombo(index)"
                    v-if="index > 0"
                  >
                    <div class="icon-delete"></div>
                    <div class="text-delete">Xóa thành phần</div>
                  </div>
                </div>
                <div class="filter-item-combo">
                  <AutoCompleteFilterItemCombo
                    style="width: 284px"
                    :value="null"
                    :placeholder="'Tìm mã hoặc tên hàng hóa'"
                    :options="inventoryItemOptionCombo"
                    @update:value="
                      updateInventoryItemIDItemCombo($event, index)
                    "
                  />
                  <Button
                    text="Đồng ý"
                    icon="icon-agree-blue"
                    color="secondary"
                    @click="getInventoryItemCombo(combo.inventoryItemID, index)"
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
                      <ItemCombo
                        v-for="(data, indexCombo) in combo.data"
                        :key="indexCombo"
                        :indexCombo="indexCombo"
                        :indexData="index"
                        :inventoryItem="data"
                        @updateQuantity="updateQuantity"
                        @updateIsSelected="updateIsSelected"
                      />
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="add-item-combo">
                <Button
                  text="Thêm thành phần"
                  icon="icon-saveadd"
                  color="secondary"
                  @click="addItemCombo"
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
              :value="[inventoryItem && inventoryItem.buyPrice]"
            />
          </div>
          <div class="info-item" v-if="isInventory || isService">
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
              :value="[inventoryItem && inventoryItem.costPrice]"
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
              :value="[inventoryItem && inventoryItem.costPrice]"
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
              :value="[inventoryItem && inventoryItem.firstStock]"
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
                :value="[inventoryItem && inventoryItem.minimumStock]"
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
                :value="[inventoryItem && inventoryItem.maximumStock]"
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
        <div class="body-item" v-if="!isCombo">
          <div class="label-item">THÔNG TIN THUỘC TÍNH</div>
          <div class="info-item">
            <div class="title-item">Thuộc tính</div>
            <div class="label-input-item">
              <div class="title-input-item" style="width: 137px">Màu sắc</div>
              <!-- <Input style="width: 295px" placeholder="Xanh, Đỏ, Vàng..." /> -->
              <InputForm
                ref="inputForm"
                :stringData="inventoryItem.color"
                @update:stringData="
                  $emit('update:inventoryItem', {
                    ...inventoryItem,
                    color: $event,
                  })
                "
                @change="handleAttributeInventoryItem"
                @delete="deleteItemColor"
              />
            </div>
          </div>

          <div class="info-item" v-if="inventoryItem.color">
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
                    :index="index"
                    :inventoryItem="item"
                    @updateItemDetail="updateItemDetail"
                    @delete="deleteItemDetail"
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
              type="number"
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
              type="number"
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
              type="number"
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
              type="number"
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
          <Button
            text="Lưu"
            icon="icon-save"
            @click="onClickSave"
            content="Ctrl + S"
            v-tippy="{
              placement: 'bottom-end',
              followCursor: true,
            }"
          />
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
            content="Ctrl + B"
            v-tippy="{
              placement: 'bottom-end',
              followCursor: true,
            }"
          />
        </div>
      </div>
    </div>
    <Loading v-if="isShowLoading" :top="'112px'" />
  </div>
</template>

<script>
import { convertString, findIndexWithAttr } from "../../utils/helper";
import { getInventoryItemCategorys } from "../../api/inventoryItemCategory.js";
import { getUnits } from "../../api/unit.js";
import {
  getInventorysByParentID,
  getInventoryItemsOptionCombo,
  getInventoryItemSelectOptionComboByParentID,
  getInventoryItemComboDetails,
  getNewCode,
} from "../../api/inventoryItem";

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
import Loading from "../../components/common/Loading.vue";

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
    Loading,
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
      inventoryItemOptionCombo: [], // Danh sách hàng hóa option làm thành phần cho combo
      itemCombo: [
        {
          inventoryItemID: null, // ID của mẫu hàng hóa
          componentID: 1, // Vị trí thành phần combo
          data: [], // Dữ liệu hàng hóa của thành phần combo
        },
      ], // Các thành phần combo
      componentID: 1, // ID nhóm thành phần hàng hóa của combo
      isShowLoading: false, // trạng thái loading
    };
  },
  created() {
    this.getInventoryItemCategorys();
    this.getUnits();
    if (
      this.inventoryItem &&
      this.inventoryItem.color &&
      this.inventoryItem.inventoryItemID
    ) {
      this.getItemDetail();
    }
    if (this.inventoryItem && this.inventoryItem.inventoryItemType == 3) {
      this.getInventoryItemsOptionCombo();
      if (this.inventoryItem.inventoryItemID) {
        this.getInventoryItemComboDetails();
      }
    }
  },
  methods: {
    //#region Lấy dữ liệu từ API
    /**
     * Lấy dữ liệu Nhóm hàng hóa
     */
    getInventoryItemCategorys() {
      this.isShowLoading = true;
      getInventoryItemCategorys()
        .then((res) => {
          if (res.statusCode == 200 || res.statusCode == 204) {
            res.data.forEach((item) => {
              this.inventoryItemCategorys.push({
                value: item.inventoryItemCategoryID,
                text: item.inventoryItemCategoryName,
              });
            });
            this.isShowLoading = false;
          }
        })
        .catch(() => {
          this.isShowLoading = false;
        });
    },
    /**
     * Lấy dữ liệu đơn vị tính
     */
    getUnits() {
      this.isShowLoading = true;

      getUnits()
        .then((res) => {
          if (res.statusCode == 200 || res.statusCode == 204) {
            res.data.forEach((item) => {
              this.units.push({
                value: item.unitID,
                text: item.unitName,
              });
            });
          }
          this.isShowLoading = false;
        })
        .catch(() => {
          this.isShowLoading = false;
        });
    },
    /**
     * Lấy thành phần thuộc tính của hàng hóa
     */
    getItemDetail() {
      this.isShowLoading = true;

      getInventorysByParentID(this.inventoryItem.inventoryItemID)
        .then((res) => {
          if (res.statusCode == 200) {
            this.itemDetails = res.data;
          }
          this.isShowLoading = false;
        })
        .catch(() => {
          this.isShowLoading = false;
        });
    },
    /**
     * Lấy danh sách hàng hóa làm thành phần cho combo
     */
    getInventoryItemsOptionCombo() {
      this.isShowLoading = true;
      getInventoryItemsOptionCombo()
        .then((res) => {
          if (res.statusCode == 200 || res.statusCode == 204) {
            res.data.forEach((item) => {
              this.inventoryItemOptionCombo.push({
                value: item.inventoryItemID,
                text: item.skuCode,
                name: item.inventoryItemName,
              });
            });
          }
          this.isShowLoading = false;
        })
        .catch(() => {
          this.isShowLoading = false;
        });
    },
    /**
     * Lấy danh sách hàng hóa thành phần của combo
     */
    getInventoryItemComboDetails() {
      this.isShowLoading = true;
      getInventoryItemComboDetails(this.inventoryItem.inventoryItemID)
        .then((res) => {
          if (res.statusCode == 200) {
            this.componentID = Math.max.apply(
              Math,
              res.data.map(function (o) {
                return o.componentID;
              })
            );

            // Xủ lý binding dữ liệu các thành phần combo
            let groups = res.data.reduce((r, a) => {
              r[a.componentID] = [...(r[a.componentID] || []), a];
              return r;
            }, {});

            let arr = [];
            for (let key in groups) {
              let obj = {};
              obj.data = groups[key];
              obj.componentID = obj.data[0].componentID;
              obj.inventoryItemID = obj.data[0].parentID;
              arr.push(obj);
            }
            this.itemCombo = arr;
          }
          this.isShowLoading = false;
        })
        .catch(() => {
          this.isShowLoading = false;
        });
    },

    /**
     * Lấy dữ liệu cho thành phần hàng hóa combo đã đc chọn
     */
    getInventoryItemCombo(ID, index) {
      this.itemCombo[index].data.forEach((item) => {
        if (item.inventoryItemComboDetailID != null) {
          this.$emit("updateItemComboListID", {
            childID: item.inventoryItemID,
            componentID: item.componentID,
            inventoryItemComboDetailID: item.inventoryItemComboDetailID,
          });
        }
      });
      if (ID != null && ID != "") {
        getInventoryItemSelectOptionComboByParentID(ID).then((res) => {
          if (res.statusCode == 200) {
            // console.log(res.data);
            this.itemCombo[index].data = res.data;
            this.itemCombo[index].data.forEach((item) => {
              if (item.quantity == null) {
                item.quantity = 1;
              }
              if (item.isSelected == null) {
                item.isSelected = true;
              }
            });
          }
        });
      }
    },

    //#endregion

    /**
     * cập nhật ID thành phân combo
     * CreatedBy: dqdat (20/07/2021)
     */
    updateInventoryItemIDItemCombo(ID, index) {
      this.itemCombo[index].inventoryItemID = ID;
    },

    /**
     * cập nhật số lượng hàng hóa thành phần của combo
     * CreatedBy: dqdat (20/07/2021)
     */
    updateQuantity(value, indexData, indexCombo) {
      this.itemCombo[indexData].data[indexCombo].quantity = parseInt(value);
    },

    /**
     * Click xác nhận đồng ý thành phần combo
     * CreatedBy: dqdat (20/07/2021)
     */
    updateIsSelected(value, indexData, indexCombo) {
      this.itemCombo[indexData].data[indexCombo].isSelected = value;
    },

    /**
     * Thêm một thành phần mới cho combo
     * CreatedBy: dqdat (20/07/2021)
     */
    addItemCombo() {
      this.componentID = this.componentID + 1;
      this.itemCombo.push({
        inventoryItemID: null,
        componentID: this.componentID,
        data: [],
      });
    },
    /**
     * Xóa một thành phần của combo
     * CreatedBy: dqdat (20/07/2021)
     */
    deleteItemCombo(index) {
      this.itemCombo[index].data.forEach((item) => {
        if (item.inventoryItemComboDetailID != null) {
          this.$emit("updateItemComboListID", {
            childID: item.inventoryItemID,
            componentID: item.componentID,
            inventoryItemComboDetailID: item.inventoryItemComboDetailID,
          });
        }
      });
      this.itemCombo.splice(index, 1);
    },

    /**
     * Blur ô nhập tên hàng hóa
     */
    onBlurInputName() {
      // Lấy mã sku mới từ hệ thống
      if (
        this.inventoryItem.skuCode == undefined ||
        this.inventoryItem.skuCode == null ||
        this.inventoryItem.skuCode == ""
      ) {
        getNewCode("InventoryItem", "SKUCode").then((res) => {
          if (res.statusCode == 200) {
            this.$emit("update:inventoryItem", {
              ...this.inventoryItem,
              skuCode: res.data,
            });
          }
        });
      }

      setTimeout(() => {
        this.handleAttributeInventoryItem();
      }, 200);
    },

    /**
     * Blur ô nhập mã sku
     * CreatedBy: dqdat (20/07/2021)
     */
    onBlurInputSKUCode() {
      setTimeout(() => {
        this.handleAttributeInventoryItem();
      }, 200);
    },
    /**
     * Click đóng dialog
     * CreatedBy: dqdat (20/07/2021)
     */
    onClickCloseDialogInventory() {
      this.$emit("closeDialogInventory");
      this.$emit("update:inventoryItem", null);
    },
    /**
     * Click Lưu
     * CreatedBy: dqdat (20/07/2021)
     */
    onClickSave() {
      if (this.inventoryItem.inventoryItemType == 3) {
        this.$emit("onSave", 3, this.itemCombo);
      } else {
        this.$emit("onSave", 1, this.itemDetails);
      }
    },
    //#region Thành phần thuộc tính của hàng hóa
    /**
     * Xử lý chi tiết thuộc tính hàng hóa
     * CreatedBy: dqdat (20/07/2021)
     */
    handleAttributeInventoryItem() {
      // console.log(this.inventoryItem.color);
      // this.itemDetails = [];
      let arrColor = [];
      this.itemDetails.forEach((item) => {
        if (item.color != null && item.color != "") {
          arrColor.push(item.color);
        }
      });
      if (this.inventoryItem.color == null || this.inventoryItem.color == "") {
        this.inventoryItem.color = "";
        // arrColor = [];
      } else if (this.inventoryItem.color.includes(",") == false) {
        arrColor.push(this.inventoryItem.color);
      } else {
        arrColor = this.inventoryItem.color.split(",");
      }

      for (let i = 0; i < arrColor.length; i++) {
        let subColor = convertString(arrColor[i], "color");
        let itemDetail = {};
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
        itemDetail.buyPrice = this.inventoryItem.buyPrice;
        itemDetail.costPrice = this.inventoryItem.costPrice;
        itemDetail.unitID = this.inventoryItem.unitID;
        itemDetail.inventoryItemCategoryID =
          this.inventoryItem.inventoryItemCategoryID;
        itemDetail.color = `${arrColor[i]}`;
        let index = findIndexWithAttr(
          this.itemDetails,
          "color",
          itemDetail.color.toString()
        );
        if (index >= 0) {
          this.itemDetails[index].skuCode = itemDetail.skuCode;
          this.itemDetails[index].inventoryItemName =
            itemDetail.inventoryItemName;
        } else {
          this.itemDetails.push(itemDetail);
        }
      }
    },
    /**
     * xóa 1 item màu sắc
     * CreatedBy: dqdat (20/07/2021)
     */
    deleteItemColor(strColor) {
      let index = findIndexWithAttr(
        this.itemDetails,
        "color",
        strColor.toString()
      );
      if (index >= 0 && this.itemDetails[index].inventoryItemID) {
        this.$emit("updateListID", this.itemDetails[index].inventoryItemID);
      }
      this.itemDetails.splice(index, 1);
      this.handleAttributeInventoryItem();
    },
    /**
     * Xóa 1 item màu sắc
     * CreatedBy: dqdat (20/07/2021)
     */
    deleteItemDetail(color) {
      this.$refs.inputForm.onClickDeleteItem(color);
    },
    /**
     * cập nhật item
     * CreatedBy: dqdat (20/07/2021)
     */
    updateItemDetail(inventoryItem, index, property) {
      this.itemDetails[index][property] = inventoryItem[property];
    },
    //#endregion

    /**
     * sự kiện nhấn phím
     * CreatedBy: dqdat (21/07/2021)
     */
    onKeyDown(e) {
      if (e.key == "b" && e.ctrlKey) {
        // ESC
        this.onClickCloseDialogInventory();
        e.preventDefault();
      }

      if (e.key == "s" && e.ctrlKey) {
        // Ctrl + s
        this.onClickSave();
        e.preventDefault();
      }
    },
  },

  mounted() {
    this.handleAttributeInventoryItem();
    this.$refs.inputInventoryItemName.$el.focus();
    document.addEventListener("keydown", this.onKeyDown);
  },
  //#region boforeDestroy
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  //#endregion
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
