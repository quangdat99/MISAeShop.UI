<template>
  <div class="pagination">
    <div class="pagination-left">
      <div class="pagination-btn icon icon-page-first"></div>
      <div class="pagination-btn icon icon-page-prev"></div>
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
      <div class="pagination-btn icon icon-page-next"></div>
      <div class="pagination-btn icon icon-page-last"></div>
      <div class="pagination-btn icon icon-page-loading"></div>

      <select
        :value="pageSize"
        @change="changePageSize($event.target.value)"
        class="pagination-combo"
      >
        <option value="15">15</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div class="pagination-right">
      <div class="pagination-right-info">
        Hiển thị 1 - {{ pageSize }} trên {{ totalRecord }} kết quả
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
     */
    changePageSize(value) {
      this.$emit("update:pageSize", parseInt(value));
    },
  },
  mounted() {
    this.pageIndex = this.pageNumber;
  },
};
</script>

<style>
</style>