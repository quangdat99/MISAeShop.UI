<template>
  <div class="dialog">
    <div class="dialog-content">
      <div class="dialog-header">
        <div class="dialog-btn">
          <Button text="Lưu" icon="icon-save" />
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
          <div class="info-item">
            <div class="title-item">
              Tên hàng hóa <span class="require"> *</span>
            </div>
            <Input style="width: 215px" />
          </div>
          <div class="info-item">
            <div class="title-item">Nhóm hàng hóa</div>
            <AutoComplete style="width: 240px" />
          </div>
          <div class="info-item">
            <div class="title-item">Mã SKU</div>

            <Input
              style="width: 240px"
              placeholder="Hệ thống tự sinh khi bỏ trống"
            />
          </div>
          <div class="info-item">
            <div class="title-item">Mã vạch</div>

            <Input
              style="width: 240px"
              placeholder="Hệ thống tự sinh khi bỏ trống"
            />
          </div>
          <div class="info-item" v-if="isInventory">
            <div class="title-item">
              Giá mua <span class="icon icon-question"></span>
            </div>
            <Input style="width: 153px" type="number" value="0" />
          </div>
          <div class="info-item">
            <div class="title-item">Giá bán</div>
            <Input style="width: 153px" type="number" value="0" />
          </div>
          <div class="info-item">
            <div class="title-item">Đơn vị tính</div>
            <AutoComplete style="width: 240px" />
          </div>
          <div class="info-item" v-if="isInventory">
            <div class="title-item">Tồn kho ban đầu</div>
            <Input style="width: 101px" type="number" value="0" />
            <div class="note-item">
              Tồn kho ban đầu chỉ được nhập khi thêm mới hàng hóa.
            </div>
          </div>
          <div class="info-item" v-if="isInventory">
            <div class="title-item">Định mức tồn kho</div>
            <div class="label-input-item">
              <div class="title-input-item">Tối thiểu</div>
              <Input style="width: 70px" type="number" value="0" />
            </div>
            <div class="label-input-item">
              <div class="title-input-item">Tối đa</div>
              <Input style="width: 60px" type="number" value="0" />
            </div>
          </div>
          <div class="info-item" v-if="isInventory">
            <div class="title-item">Vị trí lưu trữ trong kho</div>
            <Input style="width: 240px" />
          </div>
          <div class="info-item" v-if="isInventory">
            <div class="title-item">Vĩ trí trưng bày</div>
            <Input style="width: 240px" />
          </div>
        </div>
        <div class="body-item">
          <div class="label-item">THÔNG TIN THUỘC TÍNH</div>
          <div class="info-item">
            <div class="title-item">Thuộc tính</div>
            <div class="label-input-item">
              <div class="title-input-item" style="width: 137px">Màu sắc</div>
              <Input style="width: 295px" placeholder="Xanh, Đỏ, Vàng..." />
            </div>
          </div>
          <div class="info-item">
            <div class="title-item"></div>
            <div class="label-input-item">
              <div class="title-input-item" style="width: 137px">Size</div>
              <Input style="width: 295px" placeholder="S, M, L, XL..." />
            </div>
          </div>
        </div>
        <div class="body-item">
          <div class="label-item">THÔNG TIN BỔ SUNG</div>
          <div class="info-item" v-if="isInventory">
            <div class="title-item">Trọng lượng gói hàng (g)</div>
            <Input style="width: 243px" />
          </div>
          <div class="info-item" v-if="isInventory">
            <div class="title-item">Kích thước đóng gói (cm)</div>
            <Input
              style="
                width: 77px;
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
              "
              placeholder="Chiều dài"
            />
            <Input
              style="width: 87px; border-radius: 0px"
              placeholder="Chiều rộng"
            />
            <Input
              style="
                width: 79px;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
              "
              placeholder="Chiều cao"
            />
          </div>
          <div class="info-item">
            <div class="title-item">Mô tả</div>
            <Textarea style="width: 438px; height: 80px" />
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
          <Button text="Lưu" icon="icon-save" />
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
import Button from "../../components/common/Button.vue";
import Input from "../../components/common/Input.vue";
import Textarea from "../../components/common/Textarea.vue";
import AutoComplete from "../../components/common/AutoComplete.vue";
export default {
  components: {
    Button,
    Input,
    Textarea,
    AutoComplete,
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
  },
  methods: {
    onClickCloseDialogInventory() {
      this.$emit("closeDialogInventory");
    },
  },
};
</script>

<style>
</style>