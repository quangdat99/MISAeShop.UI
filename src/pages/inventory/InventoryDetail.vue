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
          <Button text="Hủy bỏ" icon="icon-cancle" color="secondary" />
        </div>
      </div>
      <div class="dialog-body">
        <div class="body-item">
          <div class="label-item">THÔNG TIN CƠ BẢN</div>
          <div class="info-item">
            <div class="title-item">
              Tên hàng hóa <span class="require"> *</span>
            </div>
            <Input style="width: 212px" />
          </div>
          <div class="info-item">
            <div class="title-item">Nhóm hàng hóa</div>
            <Input />
          </div>
          <div class="info-item">
            <div class="title-item">Mã SKU</div>

            <Input
              style="width: 238px"
              placeholder="Hệ thống tự sinh khi bỏ trống"
              width="238px"
            />
          </div>
          <div class="info-item">
            <div class="title-item">Mã vạch</div>

            <Input
              style="width: 238px"
              placeholder="Hệ thống tự sinh khi bỏ trống"
              width="238px"
            />
          </div>
          <div class="info-item">
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
            <Input />
          </div>
          <div class="info-item">
            <div class="title-item">Tồn kho ban đầu</div>
            <Input style="width: 101px" type="number" value="0" />
            <div class="note-item">
              Tồn kho ban đầu chỉ được nhập khi thêm mới hàng hóa.
            </div>
          </div>
          <div class="info-item">
            <div class="title-item">Định mức tồn kho</div>
            <Input />
          </div>
          <div class="info-item">
            <div class="title-item">Vị trí lưu trữ trong kho</div>
            <Input style="width: 238px" />
          </div>
          <div class="info-item">
            <div class="title-item">Vĩ trí trưng bày</div>
            <Input style="width: 238px" />
          </div>
        </div>
        <div class="body-item">
          <div class="label-item">THÔNG TIN THUỘC TÍNH</div>
          <div class="info-item">
            <div class="title-item">Thuộc tính</div>
            <Input style="width: 238px" />
          </div>
          <div class="info-item">
            <div class="title-item"></div>
            <Input style="width: 238px" />
          </div>
        </div>
        <div class="body-item">
          <div class="label-item">THÔNG TIN BỔ SUNG</div>
          <div class="info-item">
            <div class="title-item">Trọng lượng gói hàng (g)</div>
            <Input style="width: 238px" />
          </div>
          <div class="info-item">
            <div class="title-item">Kích thước đóng gói (cm)</div>
            <Input style="width: 238px" />
          </div>
          <div class="info-item">
            <div class="title-item">Mô tả</div>
            <Textarea style="width: 438px; height: 80px" />
          </div>
          <div class="info-item">
            <div class="title-item">Ảnh hàng hóa</div>
            <div class="layout-item">
              <div class="option-item"></div>
              <div class="image-item"></div>
              <div class="up-image-item"></div>
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
          <Button text="Hủy bỏ" icon="icon-cancle" color="secondary" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/common/Button.vue";
import Input from "../../components/common/Input.vue";
import Textarea from "../../components/common/Textarea.vue";
export default {
  components: {
    Button,
    Input,
    Textarea,
  },
};
</script>

<style>
</style>