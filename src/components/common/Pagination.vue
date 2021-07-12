<template>
  <div class="pagination">
    <div class="pagination-left">
      <div class="pagination-btn icon icon-page-first"></div>
      <div class="pagination-btn icon icon-page-prev"></div>
      <div class="pagination-item-label">Trang</div>
      <input class="input" type="number" @focus="$event.target.select()" />
      <div class="pagination-item-label">trên 5</div>
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
// import Input from "./Input.vue";
export default {
  //   components: { Input },
};
</script>

<style>
</style>