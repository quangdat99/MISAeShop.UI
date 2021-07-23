<template>
  <div class="pagination">
    <div class="pagination-left">
      <div
        class="pagination-btn icon icon-page-first"
        @click="$emit('update:pageNumber', 1)"
        :class="[pageNumber == 1 ? 'disable' : '']"
      ></div>
      <div
        class="pagination-btn icon icon-page-prev"
        @click="$emit('update:pageNumber', pageIndex - 1)"
        :class="[pageNumber == 1 ? 'disable' : '']"
      ></div>
      <div class="pagination-item-label">Trang</div>
      <input
        class="input"
        v-model="pageIndex"
        type="number"
        @focus="$event.target.select()"
        @keydown.enter.prevent="changePageNumber"
        @blur.prevent="changePageNumber"
      />
      <div class="pagination-item-label">trên {{ totalPage }}</div>
      <div
        class="pagination-btn icon icon-page-next"
        @click="$emit('update:pageNumber', pageIndex + 1)"
        :class="[pageNumber == totalPage ? 'disable' : '']"
      ></div>
      <div
        class="pagination-btn icon icon-page-last"
        @click="$emit('update:pageNumber', totalPage)"
        :class="[pageNumber == totalPage ? 'disable' : '']"
      ></div>
      <div
        class="pagination-btn icon icon-page-loading"
        @click="$emit('onRefeshData')"
      ></div>

      <select
        :value="pageSize"
        @change="changePageSize($event.target.value)"
        class="pagination-combo"
      >
        <option value="5">5</option>
        <option value="15">15</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div class="pagination-right">
      <div class="pagination-right-info" v-if="pageSize <= totalRecord">
        Hiển thị {{ pageSize * (pageIndex - 1) + 1 }} -
        {{
          pageSize * pageIndex > totalRecord
            ? totalRecord
            : pageIndex * pageSize
        }}
        trên {{ totalRecord }} kết quả
      </div>
      <div
        class="pagination-right-info"
        v-if="pageSize > totalRecord && totalRecord > 0"
      >
        Hiển thị 1 - {{ totalRecord }} trên {{ totalRecord }} kết quả
      </div>
      <div class="pagination-right-info" v-if="totalRecord == 0">
        Không có dữ liệu
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Chỉ số trang
     */
    pageNumber: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 15,
    },
    /**
     * Tổng số trang
     */
    totalPage: {
      type: Number,
      default: 1,
    },
    /**
     * Tổng số bản ghi
     */
    totalRecord: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      pageIndex: 1,
    };
  },
  methods: {
    /**
     * Thay đổi pageNumber
     * CreatedBy: dqdat (20/07/2021)
     */
    changePageNumber() {
      if (this.pageIndex >= 1 && this.pageIndex <= this.totalPage) {
        this.$emit("update:pageNumber", parseInt(this.pageIndex));
      } else {
        this.pageIndex = this.pageNumber;
      }
    },
    /**
     * Thay đổi pageSize
     * CreatedBy: dqdat (20/07/2021)
     */
    changePageSize(value) {
      this.$emit("update:pageSize", parseInt(value));
      this.$emit("update:pageNumber", 1);
      this.pageIndex = 1;
    },
  },
  mounted() {
    this.pageIndex = this.pageNumber;
  },
  watch: {
    pageNumber: function () {
      this.pageIndex = this.pageNumber;
    },
  },
};
</script>

<style>
</style>