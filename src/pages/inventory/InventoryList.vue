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
              <div class="th-title">
                <div>Mã SKU</div>
                <div>!</div>
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
              <div class="th-title">
                <div>Tên hàng hóa</div>
                <div>!</div>
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
              <div class="th-title">
                <div>Nhóm hàng hóa</div>
                <div>!</div>
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
              <div class="th-title">
                <div>Đơn vị tính</div>
                <div>!</div>
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
              <div class="th-title">
                <div>Giá bán TB</div>
                <div>!</div>
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
                <div>!</div>
              </div>
              <tr>
                <div>
                  <AutoCompleteFilter
                    style="width: 154px"
                    :value="'2'"
                    :options="[
                      { value: '1', text: 'Chiếc' },
                      { value: '2', text: 'Cái' },
                      { value: '3', text: 'Hộp' },
                    ]"
                  />
                </div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Loại hàng hóa</div>
                <div>!</div>
              </div>
              <tr>
                <div><AutoCompleteFilter style="width: 134px" /></div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Quản lý theo</div>
                <div>!</div>
              </div>
              <tr>
                <div><AutoCompleteFilter style="width: 134px" /></div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Trạng thái</div>
                <div>!</div>
              </div>
              <tr>
                <div><AutoCompleteFilter style="width: 134px" /></div>
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
      ],
    },
  }),
  created() {
    this.getPaging();
  },
  methods: {
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
