<template>
  <div class="content">
    <div class="toolbar">
      <div class="toolbar-btn">
        <ButtonDropdown
          text="Thêm mới"
          icon="icon-btnnew-white"
          @click="onClickShowDialogInventory"
        />
      </div>
      <div class="toolbar-btn">
        <Button
          text="Nhân bản"
          icon="icon-btnclone-white"
          :class="[
            inventoryListConfig.isDisableButtonDuplicate ? 'disable' : '',
          ]"
          @click="onClickDuplicate"
        />
      </div>
      <div class="toolbar-btn">
        <Button
          text="Sửa"
          icon="icon-btnedit-white"
          :class="[inventoryListConfig.isDisableButtonEdit ? 'disable' : '']"
          @click="onClickEdit"
          content="Ctrl + E"
          v-tippy="{
            placement: 'bottom-end',
            followCursor: true,
          }"
        />
      </div>
      <div class="toolbar-btn">
        <Button
          text="Xóa"
          icon="icon-btndel-white"
          :class="[inventoryListConfig.isDisableButtonDelete ? 'disable' : '']"
          @click="onShowConfirmDialog"
          content="Ctrl + D"
          v-tippy="{
            placement: 'bottom-end',
            followCursor: true,
          }"
        />
      </div>
      <div class="toolbar-btn">
        <Button
          text="Nạp"
          icon="icon-btnrefresh-white"
          @click="onClickBtnRefresh"
          content="Ctrl + Y"
          v-tippy="{
            placement: 'bottom-end',
            followCursor: true,
          }"
        />
      </div>
    </div>
    <div class="grid">
      <table class="table">
        <thead>
          <tr>
            <th><Checkbox :value.sync="inventoryListConfig.isSelectAll" /></th>
            <th>
              <div class="th-title" @click="sort('skuCode')">
                <div>Mã SKU</div>
                <div
                  :class="[
                    filterData.sortType == 'ASC' &&
                    filterData.sortProperty == 'skuCode'
                      ? 'ASC'
                      : filterData.sortType == 'DESC' &&
                        filterData.sortProperty == 'skuCode'
                      ? 'DESC'
                      : '',
                  ]"
                ></div>
              </div>
              <tr>
                <div>
                  <FilterType
                    :optionFilter="optionFilter"
                    @updatePaging="getPaging"
                    :value.sync="filterData.dataFilter[0].filterType"
                  />
                </div>
                <div>
                  <InputFilter
                    style="width: 60px"
                    :value.sync="filterData.dataFilter[0].filterValue"
                    @updatePaging="getPaging"
                  />
                </div>
              </tr>
            </th>
            <th>
              <div class="th-title" @click="sort('inventoryItemName')">
                <div>Tên hàng hóa</div>
                <div
                  :class="[
                    filterData.sortType == 'ASC' &&
                    filterData.sortProperty == 'inventoryItemName'
                      ? 'ASC'
                      : filterData.sortType == 'DESC' &&
                        filterData.sortProperty == 'inventoryItemName'
                      ? 'DESC'
                      : '',
                  ]"
                ></div>
              </div>
              <tr>
                <div>
                  <FilterType
                    :optionFilter="optionFilter"
                    @updatePaging="getPaging"
                    :value.sync="filterData.dataFilter[1].filterType"
                  />
                </div>
                <div>
                  <InputFilter
                    style="width: 240px"
                    @updatePaging="getPaging"
                    :value.sync="filterData.dataFilter[1].filterValue"
                  />
                </div>
              </tr>
            </th>
            <th>
              <div class="th-title" @click="sort('inventoryItemCategoryName')">
                <div>Nhóm hàng hóa</div>
                <div
                  :class="[
                    filterData.sortType == 'ASC' &&
                    filterData.sortProperty == 'inventoryItemCategoryName'
                      ? 'ASC'
                      : filterData.sortType == 'DESC' &&
                        filterData.sortProperty == 'inventoryItemCategoryName'
                      ? 'DESC'
                      : '',
                  ]"
                ></div>
              </div>
              <tr>
                <div>
                  <FilterType
                    :optionFilter="optionFilter"
                    @updatePaging="getPaging"
                    :value.sync="filterData.dataFilter[2].filterType"
                  />
                </div>
                <div>
                  <InputFilter
                    style="width: 100px"
                    @updatePaging="getPaging"
                    :value.sync="filterData.dataFilter[2].filterValue"
                  />
                </div>
              </tr>
            </th>
            <th>
              <div class="th-title" @click="sort('unitName')">
                <div>Đơn vị tính</div>
                <div
                  :class="[
                    filterData.sortType == 'ASC' &&
                    filterData.sortProperty == 'unitName'
                      ? 'ASC'
                      : filterData.sortType == 'DESC' &&
                        filterData.sortProperty == 'unitName'
                      ? 'DESC'
                      : '',
                  ]"
                ></div>
              </div>
              <tr>
                <div>
                  <FilterType
                    :optionFilter="optionFilter"
                    @updatePaging="getPaging"
                    :value.sync="filterData.dataFilter[3].filterType"
                  />
                </div>
                <div>
                  <InputFilter
                    style="width: 80px"
                    @updatePaging="getPaging"
                    :value.sync="filterData.dataFilter[3].filterValue"
                  />
                </div>
              </tr>
            </th>
            <th>
              <div class="th-title" @click="sort('costPrice')">
                <div>Giá bán TB</div>
                <div
                  :class="[
                    filterData.sortType == 'ASC' &&
                    filterData.sortProperty == 'costPrice'
                      ? 'ASC'
                      : filterData.sortType == 'DESC' &&
                        filterData.sortProperty == 'costPrice'
                      ? 'DESC'
                      : '',
                  ]"
                ></div>
              </div>
              <tr>
                <div>
                  <FilterType
                    :optionFilter="optionFilterNumber"
                    @updatePaging="getPaging"
                    :value.sync="filterData.dataFilter[4].filterType"
                  />
                </div>
                <div>
                  <InputFilter
                    :type="'number'"
                    style="width: 80px"
                    @updatePaging="getPaging"
                    :value.sync="filterData.dataFilter[4].filterValue"
                  />
                </div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Hiển thị trên MH bán hàng</div>
              </div>
              <tr>
                <div>
                  <AutoCompleteFilter
                    style="width: 154px"
                    @updatePaging="getPaging"
                    :value.sync="filterData.dataFilter[5].filterValue"
                    :options="[
                      { value: 0, text: 'Tất cả' },
                      { value: 1, text: 'Có' },
                      { value: 2, text: 'Không' },
                    ]"
                  />
                </div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Loại hàng hóa</div>
              </div>
              <tr>
                <div>
                  <AutoCompleteFilter
                    style="width: 134px"
                    @updatePaging="getPaging"
                    :value.sync="filterData.dataFilter[6].filterValue"
                    :options="[
                      { value: 0, text: 'Tất cả' },
                      { value: 1, text: 'Hàng hóa' },
                      { value: 3, text: 'Combo' },
                      { value: 2, text: 'Dịch vụ' },
                    ]"
                  />
                </div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Quản lý theo</div>
              </div>
              <tr>
                <div>
                  <AutoCompleteFilter
                    style="width: 134px"
                    @updatePaging="getPaging"
                    :value.sync="filterData.dataFilter[7].filterValue"
                    :options="[
                      { value: 0, text: 'Tất cả' },
                      { value: 1, text: 'Khác' },
                      { value: 2, text: 'Lô/Hạn sử dụng' },
                      { value: 3, text: 'Serial/IMEI' },
                    ]"
                  />
                </div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Trạng thái</div>
              </div>
              <tr>
                <div>
                  <AutoCompleteFilter
                    style="width: 134px"
                    @updatePaging="getPaging"
                    :value.sync="filterData.dataFilter[8].filterValue"
                    :options="[
                      { value: 0, text: 'Tất cả' },
                      { value: 1, text: 'Đang kinh doanh' },
                      { value: 2, text: 'Ngừng kinh doanh' },
                    ]"
                  />
                </div>
              </tr>
            </th>
          </tr>
        </thead>
        <tbody>
          <InventoryItem
            v-for="(inventoryItem, index) in inventoryListConfig.inventoryItems"
            :key="inventoryItem.inventoryItemID"
            :class="[index % 2 == 0 ? 'odd' : 'even']"
            :inventoryItem="inventoryItem"
            @click="onClickInventoryItem"
            @select="updateSelectionListID"
          />
        </tbody>
      </table>
    </div>
    <div class="footer">
      <Pagination
        :pageNumber.sync="filterData.pageNumber"
        :totalPage="inventoryListConfig.totalPage"
        :totalRecord="inventoryListConfig.totalRecord"
        :pageSize.sync="filterData.pageSize"
        @onRefeshData="onClickBtnRefresh"
      />
    </div>
    <InventoryDetail
      ref="inventoryDetail"
      v-if="inventoryDetailConfig.isShow"
      :inventoryItem.sync="inventoryDetailConfig.inventoryItem"
      :isInventory="inventoryDetailConfig.isInventory"
      :isService="inventoryDetailConfig.isService"
      :isCombo="inventoryDetailConfig.isCombo"
      @closeDialogInventory="closeDialogInventory"
      @onSave="onClickBtnSave"
      @updateListID="updateInventoryItemIDList"
      @updateItemComboListID="updateItemComboListID"
    />
    <ConfirmDialog
      v-if="confirmDialogConfig.isShow"
      :title="confirmDialogConfig.title"
      :msg="confirmDialogConfig.msg"
      :type="confirmDialogConfig.type"
      @onClose="onCloseConfirmDialog"
      @onOk="onClickDelete"
    />
    <AlertDialog
      v-if="alertDialogConfig.isShow"
      :msg="alertDialogConfig.msg"
      :type="alertDialogConfig.type"
      @onClose="onCloseAlertDialog"
    />
    <Loading v-if="inventoryListConfig.isShowLoading" />
  </div>
</template>

<script>
import {
  getPaging,
  saveInventoryItem,
  getInventoryBySKUCode,
  deleteInventoryItemByID,
  getNewCode,
  CheckInventoryItemIncurred,
  // deleteInventoryItemByParentID,
} from "../../api/inventoryItem.js";

import {
  saveInventoryItemComboDetail,
  deleteInventoryItemCombo,
} from "../../api/inventoryItemComboDetail.js";

import InventoryDetail from "../../pages/inventory/InventoryDetail.vue";
import AlertDialog from "../../components/common/AlertDialog.vue";
import ConfirmDialog from "../../components/common/ConfirmDialog.vue";
import Loading from "../../components/common/Loading";
import Pagination from "../../components/common/Pagination.vue";
import Button from "../../components/common/Button.vue";
import ButtonDropdown from "../../components/common/ButtonDropdown.vue";
import Checkbox from "../../components/common/Checkbox.vue";
import FilterType from "../../components/common/FilterType.vue";
import InputFilter from "../../components/common/InputFilter.vue";
import InventoryItem from "../../pages/inventory/InventoryItem.vue";
import AutoCompleteFilter from "../../components/common/AutoCompleteFilter.vue";
export default {
  components: {
    Button,
    ButtonDropdown,
    Checkbox,
    FilterType,
    InputFilter,
    Loading,
    AlertDialog,
    ConfirmDialog,
    InventoryItem,
    InventoryDetail,
    Pagination,
    AutoCompleteFilter,
  },
  data: () => ({
    optionFilter: [
      { value: 1, text: "* : Chứa", prefix: "*" },
      { value: 2, text: "+ : Bắt đầu bằng", prefix: "+" },
      { value: 4, text: "= : Bằng", prefix: "=" },
      { value: 3, text: "- : Kết thúc bằng", prefix: "-" },
      { value: 5, text: "! : Không chứa", prefix: "!" },
    ], // kiểu lọc option text
    optionFilterNumber: [
      { value: 6, text: "&le; : Nhỏ hơn hoặc bằng", prefix: "&le;" },
      { value: 7, text: "< : Nhỏ hơn", prefix: "<" },
      { value: 8, text: "= : Bằng", prefix: "=" },
      { value: 9, text: "&ge; : Lớn hơn hoặc bằng", prefix: "&ge;" },
      { value: 10, text: "> : Lớn hơn", prefix: ">" },
    ], // kiểu lọc option number
    /**
     * Cấu hình dialog hàng hóa
     */
    inventoryDetailConfig: {
      inventoryItem: {}, // Thông tin hàng hóa
      isInsert: null, // 1-Thêm mới, 2-Sửa, 3-Nhân bản
      isShow: false, // Hiển thị dialog
      isInventory: false, // Là hàng hóa
      isService: false, // Là dịch vụ
      isCombo: false, // Là combo
    },
    /**
     * Cấu hình list hàng hóa
     */
    inventoryListConfig: {
      inventoryItemIDList: [], // Danh sách ID hàng hóa chi tiết
      inventoryItemComboIDList: [], // Danh sách ID hàng hóa thành phần của combo
      isShowLoading: false, // Trạng thái loading
      inventoryItems: [], // Danh sách hàng hóa
      inventoryItemCategorys: [], // Danh sách nhóm hàng hóa
      units: [], // Danh sách đơn vị tính
      isSelectAll: false, // Trạng thái chọn tất cả bản ghi
      selectionListID: [], // Danh sách ID được lựa chọn
      totalPage: 1, // Tổng số trang
      totalRecord: 0, // Tổng số bản ghi
      isDisableButtonDelete: true, // disable nút xóa
      isDisableButtonDuplicate: true, // Disable nút nhân bản
      isDisableButtonEdit: true, // Disable nút sửa
    },
    /**
     * Lọc dữ liệu trang
     */
    filterData: {
      pageNumber: 1, // Chỉ số trang
      pageSize: 15, // Kích thước trang
      sortProperty: "", // Trường được sắp xếp
      sortType: "", // Kiểu sắp xếp: ASC/ DESC
      dataFilter: [
        {
          filterProperty: "skuCode",
          filterType: 1,
          filterValue: "",
        },
        {
          filterProperty: "inventoryItemName",
          filterType: 1,
          filterValue: "",
        },
        {
          filterProperty: "inventoryItemCategoryName",
          filterType: 1,
          filterValue: "",
        },
        {
          filterProperty: "unitName",
          filterType: 1,
          filterValue: "",
        },
        {
          filterProperty: "costPrice",
          filterType: 6,
          filterValue: null,
        },
        {
          filterProperty: "showInMenu",
          filterType: 8,
          filterValue: 0,
        },
        {
          filterProperty: "inventoryItemType",
          filterType: 8,
          filterValue: 0,
        },
        {
          filterProperty: "manageType",
          filterType: 8,
          filterValue: 0,
        },
        {
          filterProperty: "ii.status",
          filterType: 8,
          filterValue: 0,
        },
      ], // Dữ liệu để tìm kiếm, sắp xếp,...
    },

    /**
     * Config của dialog Thông báo
     */
    alertDialogConfig: {
      isShow: false,
      msg: "",
      type: "warning",
    },

    /**
     * Config của dialog xác nhận
     */
    confirmDialogConfig: {
      isShow: false,
      msg: "",
      title: "MISA",
      type: "warning",
    },
  }),
  created() {
    this.getPaging();
  },
  methods: {
    /**
     * Lấy dữ liệu hàng hóa
     * CreatedBy: dqdat (20/07/2021)
     */
    getPaging() {
      this.inventoryListConfig.isShowLoading = true;
      getPaging(this.filterData)
        .then((res) => {
          if (res.statusCode == 200 || res.statusCode == 204) {
            this.inventoryListConfig.totalRecord = res.totalRecord;
            this.inventoryListConfig.totalPage = Math.ceil(
              this.inventoryListConfig.totalRecord / this.filterData.pageSize
            );
            if (this.inventoryListConfig.totalPage == 0) {
              this.inventoryListConfig.totalPage = 1;
            }

            this.inventoryListConfig.inventoryItems = res.data;
            this.inventoryListConfig.isShowLoading = false;
          }
        })
        .catch(() => {
          this.inventoryListConfig.isShowLoading = false;
        });
    },
    /**
     * Click sắp xếp
     * CreatedBy: dqdat (20/07/2021)
     */
    sort(propertyName) {
      this.filterData.sortProperty = propertyName.toString();
      if (this.filterData.sortType == "ASC") {
        this.filterData.sortType = "DESC";
      } else if (this.filterData.sortType == "DESC") {
        this.filterData.sortType = "ASC";
      } else {
        this.filterData.sortType = "ASC";
      }
      this.getPaging();
    },

    /**
     * Đóng dialog hàng hóa
     * CreatedBy: dqdat (20/07/2021)
     */
    closeDialogInventory() {
      this.inventoryDetailConfig.isShow = false;
    },
    /**
     * Click show dialog hàng hóa
     * CreatedBy: dqdat (20/07/2021)
     */
    onClickShowDialogInventory(mode) {
      this.inventoryDetailConfig.isInsert = true;
      this.inventoryDetailConfig.isShow = true;
      this.inventoryDetailConfig.isInventory = false;
      this.inventoryDetailConfig.isService = false;
      this.inventoryDetailConfig.isCombo = false;
      this.inventoryDetailConfig.inventoryItem = {};

      // mode: 1-hàng hóa, 2-dịch vụ, 3-combo
      if (mode == 1) {
        this.inventoryDetailConfig.isInventory = true;
        this.inventoryDetailConfig.inventoryItem.unitID =
          "7e29381f-e31b-11eb-87b7-00163e047e89";
        this.inventoryDetailConfig.inventoryItem.inventoryItemType = 1;
      } else if (mode == 2) {
        this.inventoryDetailConfig.isService = true;
        this.inventoryDetailConfig.inventoryItem.unitID =
          "49ed48ec-e324-11eb-87b7-00163e047e89";
        this.inventoryDetailConfig.inventoryItem.inventoryItemType = 2;
      } else if (mode == 3) {
        this.inventoryDetailConfig.isCombo = true;
        this.inventoryDetailConfig.inventoryItem.unitID =
          "45810740-e324-11eb-87b7-00163e047e89";
        this.inventoryDetailConfig.inventoryItem.inventoryItemType = 3;
      }
      this.inventoryDetailConfig.inventoryItem.showInMenu = 1;
      if (this.inventoryDetailConfig.inventoryItem.buyPrice == null) {
        this.inventoryDetailConfig.inventoryItem.buyPrice = 0;
      }
      if (this.inventoryDetailConfig.inventoryItem.costPrice == null) {
        this.inventoryDetailConfig.inventoryItem.costPrice = 0;
      }
      if (this.inventoryDetailConfig.inventoryItem.firstStock == null) {
        this.inventoryDetailConfig.inventoryItem.firstStock = 0;
      }
      if (this.inventoryDetailConfig.inventoryItem.minimumStock == null) {
        this.inventoryDetailConfig.inventoryItem.minimumStock = 0;
      }
      if (this.inventoryDetailConfig.inventoryItem.maximumStock == null) {
        this.inventoryDetailConfig.inventoryItem.maximumStock = 0;
      }
    },
    /**
     * Click inventoryItem
     * CreatedBy: dqdat (20/07/2021)
     */
    onClickInventoryItem(inventoryItem) {
      this.onClickShowDialogInventory(inventoryItem.inventoryItemType);
      this.inventoryDetailConfig.isInsert = false;
      this.inventoryDetailConfig.inventoryItem = inventoryItem;
    },
    /**
     * Click button lưu
     * CreatedBy: dqdat (20/07/2021)
     */
    async onClickBtnSave(rule, arrObj) {
      await saveInventoryItem(
        this.inventoryDetailConfig.inventoryItem,
        this.inventoryDetailConfig.isInsert
      )
        .then(async (res) => {
          return await res;
        })
        .then(async (res) => {
          if (res.statusCode == 200) {
            // Lưu thông tin hàng hóa loại thông thường và dịch vụ
            if (
              // rule = 1: đối với hàng hóa thông thường và dịch vụ
              // arrobj: dữ liệu thành phần thuộc tính
              rule == 1 &&
              (arrObj.length > 0 ||
                this.inventoryListConfig.inventoryItemIDList.length > 0)
            ) {
              // Lấy dữ liệu theo mã sku
              await getInventoryBySKUCode(
                this.inventoryDetailConfig.inventoryItem.skuCode
              ).then(async (res) => {
                if (res.statusCode == 200) {
                  this.inventoryListConfig.inventoryItemIDList.forEach(
                    async (ID) => {
                      // Xóa hàng hóa theo ID
                      await deleteInventoryItemByID(ID).then(() => {
                        // console.log(res);
                      });
                    }
                  );
                  this.inventoryListConfig.inventoryItemIDList = [];
                  if (res.statusCode == 200) {
                    let i = 0;
                    while (i <= arrObj.length - 1) {
                      arrObj[i].inventoryItemType = res.data.inventoryItemType;
                      if (arrObj[i].parentID == res.data.inventoryItemID) {
                        // Thực hiện sửa dữ liệu
                        arrObj[i].parentID = res.data.inventoryItemID;
                        await saveInventoryItem(arrObj[i], false).then(() => {
                          // console.log(res);
                          i = i + 1;
                        });
                      } else {
                        // Thực hiện thêm mới dữ liệu
                        arrObj[i].parentID = res.data.inventoryItemID;
                        await saveInventoryItem(arrObj[i], true).then(() => {
                          // console.log(res);
                          i = i + 1;
                        });
                      }
                    }
                  }
                }
              });
            }
            // Lưu thông tin hàng hóa loại combo
            if (rule == 3 && arrObj.length >= 0) {
              // rule = 3: đối với hàng hóa loại combo
              // arrObj: dữ liệu thành phần hàng hóa của conbo
              await getInventoryBySKUCode(
                // Lấy dữ liệu theo mã sku
                this.inventoryDetailConfig.inventoryItem.skuCode
              ).then(async (res) => {
                if (res.statusCode == 200) {
                  this.inventoryListConfig.inventoryItemComboIDList.forEach(
                    async (objID) => {
                      // Xóa dữ liệu theo dữ liệu ID các trường
                      await deleteInventoryItemCombo(objID).then(() => {
                        // console.log(res);
                      });
                    }
                  );
                  this.inventoryListConfig.inventoryItemComboIDList = [];
                  arrObj.forEach(async (combo) => {
                    combo.data.forEach(async (item) => {
                      let obj = {};
                      obj.componentID = combo.componentID;
                      obj.childID = item.inventoryItemID;
                      obj.quantity = item.quantity;
                      obj.isSelected = item.isSelected;

                      if (
                        item.inventoryItemComboDetailID ==
                        res.data.inventoryItemID
                      ) {
                        // Thực hiện sửa thành phần hàng hóa của combo
                        obj.inventoryItemComboDetailID =
                          res.data.inventoryItemID;
                        await saveInventoryItemComboDetail(obj, false).then(
                          () => {
                            // console.log(res);
                          }
                        );
                      } else {
                        // Thực hiện thêm mới thành phần hàng hóa của combo
                        obj.inventoryItemComboDetailID =
                          res.data.inventoryItemID;
                        await saveInventoryItemComboDetail(obj, true).then(
                          () => {
                            // console.log(res);
                          }
                        );
                      }
                    });
                  });
                }
              });
            }
            this.inventoryDetailConfig.isShow = false;
          } else if (res.statusCode == 400) {
            this.showAlertDialog(res.userMessage, "warning");
          } else if (res.statusCode == 500) {
            this.showAlertDialog(res.userMessage, "error");
          }
        });

      if (this.inventoryDetailConfig.isShow == false) {
        if (this.inventoryDetailConfig.isInsert == true) {
          this.onClickBtnRefresh();
        } else {
          this.getPaging();
        }
      }
    },
    //#region ConfirmDialog
    /**
     * Hàm đóng dialog xác nhận.
     * CreatedBy: dqdat (21/07/2021)
     */
    onCloseConfirmDialog() {
      this.confirmDialogConfig.isShow = false;
      this.confirmDialogConfig.msg = "";
    },
    /**
     * Hàm show dialog xác nhận
     * CreatedBy: dqdat (21/07/2021)
     */
    onShowConfirmDialog() {
      let listID = this.inventoryListConfig.selectionListID;
      if (listID.length == 1) {
        let inventoryItem = this.inventoryListConfig.inventoryItems.find(
          (item) => item.inventoryItemID == listID[0]
        );
        this.confirmDialogConfig.msg = `Có có chắc chắn muốn xóa hàng hóa <b style="color:#df4646" > ${inventoryItem.inventoryItemName} - (${inventoryItem.skuCode}) </b> không ?`;
      } else if (listID.length > 1) {
        this.confirmDialogConfig.msg = `Bạn có chắc chắn muốn xóa các hàng hóa đã chọn không ?`;
      }
      this.confirmDialogConfig.isShow = true;
      this.confirmDialogConfig.type = "question";
      this.confirmDialogConfig.title = "Xóa dữ liệu";
    },
    //#endregion

    //#region AlertDialog
    /**
     * Hàm đóng dialog thông báo.
     * CreatedBy: dqdat (21/07/2021)
     */
    onCloseAlertDialog() {
      this.alertDialogConfig = {
        isShow: false,
        msg: "",
        type: "warning",
      };
    },

    /**
     * Hàm show dialog thông báo.
     * CreatedBy: dqdat (21/07/2021)
     */
    showAlertDialog(msg, type) {
      this.alertDialogConfig.isShow = true;
      this.alertDialogConfig.msg = msg;
      this.alertDialogConfig.type = type;
    },
    //#endregion

    //#region update List ID
    /**
     * update danh sách ID hàng hóa thuộc tính chi tiết
     * CreatedBy: dqdat (20/07/2021)
     */
    updateInventoryItemIDList(ID) {
      this.inventoryListConfig.inventoryItemIDList.push(ID);
    },

    /**
     * update danh sách ID hàng hóa thành phần của combo
     * CreatedBy: dqdat (20/07/2021)
     */
    updateItemComboListID(objID) {
      this.inventoryListConfig.inventoryItemComboIDList.push(objID);
    },

    /**
     * Cập nhật lại Danh sách ID được chọn
     * CreatedBy: dqdat (20/07/2021)
     */
    updateSelectionListID(ID, isSelect) {
      if (isSelect == true) {
        this.inventoryListConfig.selectionListID.push(ID.toString());
      } else {
        this.inventoryListConfig.selectionListID =
          this.inventoryListConfig.selectionListID.filter((s) => s != ID);
      }
    },
    //#endregion

    //#region sự kiện click trên toolbar
    /**
     * Nhân bản hàng hóa theo checkbox được chọn
     * CreatedBy: dqdat (20/07/2021)
     */
    onClickDuplicate() {
      let ID = this.inventoryListConfig.selectionListID[0];
      let inventoryItem = this.inventoryListConfig.inventoryItems.find(
        (item) => item.inventoryItemID == ID
      );
      let newInventoryItem = Object.assign({}, inventoryItem);
      if (newInventoryItem.inventoryItemType !== 3) {
        delete newInventoryItem.inventoryItemID;
      }

      this.onClickInventoryItem(newInventoryItem);
      this.inventoryDetailConfig.isInsert = true;
      // Lấy mã sku mới
      getNewCode("InventoryItem", "SKUCode").then((res) => {
        if (res.statusCode == 200) {
          this.inventoryDetailConfig.inventoryItem.skuCode = res.data;
        } else {
          this.inventoryDetailConfig.inventoryItem.skuCode = null;
        }
      });
      // Lấy mã vạch mới
      getNewCode("InventoryItem", "BarCode").then((res) => {
        if (res.statusCode == 200) {
          this.inventoryDetailConfig.inventoryItem.barCode = res.data;
        } else {
          this.inventoryDetailConfig.inventoryItem.barCode = null;
        }
      });
    },

    /**
     * Sửa hàng hóa theo checkbox được chọn
     * CreatedBy: dqdat (20/07/2021)
     */
    onClickEdit() {
      let ID = this.inventoryListConfig.selectionListID[0];
      let inventoryItem = this.inventoryListConfig.inventoryItems.find(
        (item) => item.inventoryItemID == ID
      );
      this.onClickInventoryItem(inventoryItem);
    },

    /**
     * Xóa hàng hóa theo checkbox được chọn
     * CreatedBy: dqdat (20/07/2021)
     */
    async onClickDelete() {
      let arrIDIncurred = [];
      let arrID = this.inventoryListConfig.selectionListID;
      if (arrID.length > 0) {
        for (let i = 0; i < arrID.length; i++) {
          let Id = arrID[i];
          // kiểm tra hàng hóa có phát sinh
          await CheckInventoryItemIncurred(Id).then(async (res) => {
            if (res.statusCode == 200) {
              if (res.data == false) {
                // không có phát sinh thì thực hiện xóa hàng hóa
                await deleteInventoryItemByID(Id).then((res) => {
                  // console.log(res);
                  if (res.statusCode == 200) {
                    this.updateSelectionListID(Id, false);
                  }
                });
              } else if (res.data == true) {
                // có phát sinh thì thông báo
                arrIDIncurred.push(Id);
              }
            }
          });
        }
      }
      // Xử lý thông báo các hàng hóa có phát sinh
      let msg = "Không xóa được hàng hóa ";
      arrIDIncurred.forEach((ID) => {
        let inventoryItem = this.inventoryListConfig.inventoryItems.find(
          (item) => item.inventoryItemID == ID
        );
        msg += inventoryItem.skuCode + ", ";
      });
      if (arrIDIncurred.length > 0) {
        msg +=
          "do hàng hóa đã có phát sinh. Xem các tình huống phát sinh và cách xử lý " +
          `<a id="helpWarningDelete" style="color: #0873b8;" href="https://help.mshopkeeper.vn/vi/kb/lam_the_nao_de_xoa_duoc_hang_hoa_khi_da_co_phat_sinh" target="_blank">tại đây</a>`;
        this.alertDialogConfig.msg = msg;
        this.alertDialogConfig.type = "error";
        this.alertDialogConfig.isShow = true;
      }
      this.getPaging();
    },

    /**
     * Click Nạp để load lại dữ liệu mới
     * CreatedBy: dqdat (20/07/2021)
     */
    onClickBtnRefresh() {
      this.filterData.pageNumber = 1;
      this.getPaging();
    },
    //#endregion

    //#region sự kiện nhấn phím
    /**
     * sự kiện nhấn phím
     * CreatedBy: dqdat (21/07/2021)
     */
    onKeyDown(e) {
      if (e.key == "1" && e.ctrlKey) {
        // ctrl + 1
        this.onClickShowDialogInventory(1);
        e.preventDefault();
      }

      if (e.key == "e" && e.ctrlKey) {
        // Ctrl + e
        this.onClickEdit();
        e.preventDefault();
      }

      if (e.key == "d" && e.ctrlKey) {
        // Ctrl + d
        this.onClickDelete();
        e.preventDefault();
      }

      if (e.key == "y" && e.ctrlKey) {
        // Ctrl + y
        this.onClickBtnRefresh();
        e.preventDefault();
      }
      //#endregion
    },
  },

  mounted() {
    document.addEventListener("keydown", this.onKeyDown);
  },

  //#region boforeDestroy
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  //#endregion

  watch: {
    paging: function () {
      this.getPaging();
    },
    "inventoryListConfig.selectionListID": function (arrID) {
      if (arrID.length > 1) {
        this.inventoryListConfig.isDisableButtonDelete = false;
        this.inventoryListConfig.isDisableButtonDuplicate = true;
        this.inventoryListConfig.isDisableButtonEdit = true;
        if (arrID.length == this.inventoryListConfig.inventoryItems.length) {
          this.inventoryListConfig.isSelectAll = true;
        }
      } else if (arrID.length == 0) {
        this.inventoryListConfig.isDisableButtonDelete = true;
        this.inventoryListConfig.isDisableButtonDuplicate = true;
        this.inventoryListConfig.isDisableButtonEdit = true;
        this.inventoryListConfig.isSelectAll = false;
      } else if (arrID.length == 1) {
        this.inventoryListConfig.isDisableButtonDelete = false;
        this.inventoryListConfig.isDisableButtonDuplicate = false;
        this.inventoryListConfig.isDisableButtonEdit = false;
        if (arrID.length == this.inventoryListConfig.inventoryItems.length) {
          this.inventoryListConfig.isSelectAll = true;
        }
      }
    },
    "inventoryListConfig.isSelectAll": function (value) {
      if (value == true) {
        this.inventoryListConfig.inventoryItems.forEach((item) => {
          item.isSelect = true;
          // this.inventoryListConfig.selectionListID = [];
          // this.inventoryListConfig.selectionListID.push(item.inventoryItemID);
        });
      } else {
        this.inventoryListConfig.inventoryItems.forEach((item) => {
          item.isSelect = false;
          this.inventoryListConfig.selectionListID = [];
        });
      }
    },
  },
  computed: {
    paging: function () {
      return [this.filterData.pageNumber, this.filterData.pageSize].join();
    },
  },
};
</script>
