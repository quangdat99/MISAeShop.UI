<template>
  <div class="pagination">
    <div class="pagination-left">
      <div class="pagination-btn icon icon-page-first"></div>
      <div class="pagination-btn icon icon-page-prev"></div>
      <div class="pagination-item-label">Trang</div>
      <input
        class="input"
        :value="pageIndex"
        type="number"
        @focus="$event.target.select()"
        @keydown.enter.prevent="updatePageNumber($event.target.value)"
        @blur="updatePageNumber($event.target.value)"
      />
      <div class="pagination-item-label">trên {{ totalPage }}</div>
      <div class="pagination-btn icon icon-page-next"></div>
      <div class="pagination-btn icon icon-page-last"></div>
      <div class="pagination-btn icon icon-page-loading"></div>

      <select class="pagination-combo">
        <option value="15">15</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div class="pagination-right">
      <div class="pagination-right-info">Hiển thị 1 - 25 trên 36 kết quả</div>
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
      default: 3,
    },
    /**
     * Tổng số trang
     */
    totalPage: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      pageIndex: 2,
    };
  },
  methods: {
    updatePageNumber(value) {
      console.log(value);
      if (value >= 1 && value <= this.totalPage) {
        this.$emit("update:pageNumber", parseInt(value));
      } else {
        this.pageIndex = this.pageNumber;
      }
    },
  },
  mounted() {
    this.pageIndex = this.pageNumber;
  },
};
</script>

<style>
</style>