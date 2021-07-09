<template>
  <div class="content">
    <div class="toolbar">
      <div class="toolbar-btn">
        <ButtonDropdown
          text="Thêm mới"
          icon="icon-btnnew-white"
          @click="onClickShowDialog"
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
                  <FilterType :optionFilter="optionFilter" />
                </div>
                <div><InputFilter style="width: 60px" /></div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Tên hàng hóa</div>
                <div>!</div>
              </div>
              <tr>
                <div>
                  <FilterType :optionFilter="optionFilter" />
                </div>
                <div><InputFilter style="width: 240px" /></div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Nhóm hàng hóa</div>
                <div>!</div>
              </div>
              <tr>
                <div>
                  <FilterType :optionFilter="optionFilter" />
                </div>
                <div><InputFilter style="width: 100px" /></div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Đơn vị tính</div>
                <div>!</div>
              </div>
              <tr>
                <div>
                  <FilterType :optionFilter="optionFilter" />
                </div>
                <div><InputFilter style="width: 80px" /></div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Giá bán TB</div>
                <div>!</div>
              </div>
              <tr>
                <div>
                  <FilterType :optionFilter="optionFilter" />
                </div>
                <div><InputFilter style="width: 80px" /></div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Hiển thị trên MH bán hàng</div>
                <div>!</div>
              </div>
              <tr>
                <div>
                  <FilterType :optionFilter="optionFilter" />
                </div>
                <div><InputFilter style="width: 120px" /></div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Loại hàng hóa</div>
                <div>!</div>
              </div>
              <tr>
                <div>
                  <FilterType :optionFilter="optionFilter" />
                </div>
                <div><InputFilter style="width: 100px" /></div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Quản lý theo</div>
                <div>!</div>
              </div>
              <tr>
                <div>
                  <FilterType :optionFilter="optionFilter" />
                </div>
                <div><InputFilter style="width: 100px" /></div>
              </tr>
            </th>
            <th>
              <div class="th-title">
                <div>Trạng thái</div>
                <div>!</div>
              </div>
              <tr>
                <div>
                  <FilterType :optionFilter="optionFilter" />
                </div>
                <div><InputFilter style="width: 100px" /></div>
              </tr>
            </th>
          </tr>
        </thead>
        <tbody>
          <InventoryItem
            v-for="n in 20"
            :key="n"
            :class="[n % 2 ? 'odd' : 'even']"
          />
        </tbody>
      </table>
    </div>
    <div class="footer"></div>
    <InventoryDetail v-if="isShowDialog" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import InventoryDetail from "../../pages/inventory/InventoryDetail.vue";

import Button from "../../components/common/Button.vue";
import ButtonDropdown from "../../components/common/ButtonDropdown.vue";
import Checkbox from "../../components/common/Checkbox.vue";
import FilterType from "../../components/common/FilterType.vue";
import InputFilter from "../../components/common/InputFilter.vue";
import InventoryItem from "../../pages/inventory/InventoryItem.vue";
// import AutoCompleteFilter from "../../components/common/AutoCompleteFilter.vue";
export default {
  components: {
    Button,
    ButtonDropdown,
    Checkbox,
    FilterType,
    InputFilter,
    InventoryItem,
    InventoryDetail,
    // AutoCompleteFilter,
  },
  data: () => ({
    optionFilter: [
      { value: 1, text: "*: Chứa" },
      { value: 2, text: "=: Bằng" },
      { value: 3, text: "+: Bắt đầu bằng" },
      { value: 4, text: "-: Kết thúc bằng" },
      { value: 5, text: "!: Không chứa" },
    ],
    isShowDialog: false,
  }),
  methods: {
    closeDialog() {
      this.isShowDialog = false;
    },
    onClickShowDialog() {
      this.isShowDialog = true;
    },
  },
};
</script>

<style>
</style>