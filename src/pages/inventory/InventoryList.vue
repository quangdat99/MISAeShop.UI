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
        <Button text="Nhân bản" icon="icon-btnclone-white" />
      </div>
      <div class="toolbar-btn">
        <Button text="Sửa" icon="icon-btnedit-white" />
      </div>
      <div class="toolbar-btn">
        <Button text="Xóa" icon="icon-btndel-white" />
      </div>
      <div class="toolbar-btn">
        <Button text="Nạp" icon="icon-btnrefresh-white" />
      </div>
    </div>
    <div class="grid">
      <table class="table">
        <thead>
          <tr>
            <th><Checkbox /></th>
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
            :key="index"
            :class="[index % 2 == 0 ? 'odd' : 'even']"
            :inventoryItem="inventoryItem"
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
      />
    </div>
    <InventoryDetail
      v-if="inventoryDetailConfig.isShow"
      :inventoryItem.sync="inventoryDetailConfig.inventoryItem"
      :isInventory="inventoryDetailConfig.isInventory"
      :isService="inventoryDetailConfig.isService"
      :isCombo="inventoryDetailConfig.isCombo"
      @closeDialogInventory="closeDialogInventory"
    />
  </div>
</template>

<script>
import { getPaging } from "../../api/inventoryItem.js";
import { getInventoryItemCategorys } from "../../api/inventoryItemCategory.js";
import { getUnits } from "../../api/unit.js";

import InventoryDetail from "../../pages/inventory/InventoryDetail.vue";

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
    InventoryItem,
    InventoryDetail,
    Pagination,
    AutoCompleteFilter,
  },
  data: () => ({
    optionFilter: [
      { value: 1, text: "* : Chứa", prefix: "*" },
      { value: 2, text: "= : Bằng", prefix: "=" },
      { value: 3, text: "+ : Bắt đầu bằng", prefix: "+" },
      { value: 4, text: "- : Kết thúc bằng", prefix: "-" },
      { value: 5, text: "! : Không chứa", prefix: "!" },
    ],
    optionFilterNumber: [
      { value: 6, text: "<= : Nhỏ hơn hoặc bằng", prefix: "&le;" },
      { value: 7, text: "< : Nhỏ hơn", prefix: "<" },
      { value: 8, text: "= : Bằng", prefix: "=" },
      { value: 9, text: ">= : Lớn hơn hoặc bằng", prefix: "&ge;" },
      { value: 10, text: "> : Lớn hơn", prefix: ">" },
    ],
    /**
     * Cấu hình dialog hàng hóa
     */
    inventoryDetailConfig: {
      mode: null, // 1-Thêm mới, 2-Sửa, 3-Nhân bản
      isShow: false, // Hiển thị dialog
      isInventory: false, // Là hàng hóa
      isService: false, // Là dịch vụ
      isCombo: false, // Là combo
      inventoryItem: {}, // Thông tin hàng hóa
    },
    /**
     * Cấu hình list hàng hóa
     */
    inventoryListConfig: {
      inventoryItems: [], // Danh sách hàng hóa
      inventoryItemCategorys: [], // Danh sách nhóm hàng hóa
      units: [], // Danh sách đơn vị tính
      totalPage: 0, // Tổng số trang
      totalRecord: 0, // Tổng số bản ghi
    },
    /**
     * Lọc dữ liệu trang
     */
    filterData: {
      pageNumber: 1, // Chỉ số trang
      pageSize: 15, // Kích thước trang
      sortProperty: "",
      sortType: "",
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
      ],
    },
  }),
  created() {
    this.getPaging();
    this.getInventoryItemCategorys();
    this.getUnits();
  },
  methods: {
    /**
     * Lấy dữ liệu hàng hóa
     */
    getPaging() {
      getPaging(this.filterData).then((res) => {
        if (res.statusCode == 200 || res.statusCode == 204) {
          this.inventoryListConfig.totalRecord = res.totalRecord;
          this.inventoryListConfig.totalPage = Math.ceil(
            this.inventoryListConfig.totalRecord / this.filterData.pageSize
          );

          this.inventoryListConfig.inventoryItems = res.data;
        }
      });
    },
    /**
     * Lấy dữ liệu Nhóm hàng hóa
     */
    getInventoryItemCategorys() {
      getInventoryItemCategorys().then((res) => {
        if (res.statusCode == 200 || res.statusCode == 204) {
          res.data.forEach((item) => {
            this.inventoryListConfig.inventoryItemCategorys.push({
              value: item.inventoryItemCategoryID,
              text: item.inventoryItemCategoryName,
            });
          });
        }
      });
    },
    getUnits() {
      getUnits().then((res) => {
        if (res.statusCode == 200 || res.statusCode == 204) {
          res.data.forEach((item) => {
            this.inventoryListConfig.units.push({
              value: item.unitID,
              text: item.unitName,
            });
          });
        }
      });
    },
    /**
     * Đóng dialog hàng hóa
     */
    closeDialogInventory() {
      this.inventoryDetailConfig.isShow = false;
    },
    /**
     * Click show dialog hàng hóa
     */
    onClickShowDialogInventory(mode) {
      this.inventoryDetailConfig = {
        isShow: true,
        isInventory: false,
        isService: false,
        isCombo: false,
        inventoryItem: {
          color: "Xanh,Đỏ",
          inventoryItemName: "Áo sơ mi",
          size: "S,M",
          skuCode: "ASM01",
        },
      };
      // mode: 1-hàng hóa, 2-dịch vụ, 3-combo
      if (mode == 1) {
        this.inventoryDetailConfig.isInventory = true;
      } else if (mode == 2) {
        this.inventoryDetailConfig.isService = true;
      } else if (mode == 3) {
        this.inventoryDetailConfig.isCombo = true;
      }
    },
    /**
     * Click sắp xếp
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
  },
  watch: {
    paging: function () {
      this.getPaging();
    },
  },
  computed: {
    paging: function () {
      return [this.filterData.pageNumber, this.filterData.pageSize].join();
    },
  },
};
</script>
