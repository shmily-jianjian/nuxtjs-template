<script setup lang="ts">
const date = defineModel<any>();
function computedDate(beforeDays: number = 0) {
  const end = new Date();
  const start = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * (beforeDays - 1));
  return [start, end];
}

const shortcuts = [
  {
    text: "今日",
    value: () => computedDate(),
  },
  {
    text: "最近三天",
    value: () => computedDate(3),
  },
  {
    text: "最近七天",
    value: () => computedDate(7),
  },
];
</script>

<template>
  <el-date-picker
    v-model="date"
    type="daterange"
    start-placeholder="请选择日期"
    end-placeholder="请选择日期"
    format="YYYY-MM-DD"
    value-format="YYYY-MM-DD"
    :shortcuts="shortcuts"
    v-bind="$attrs"
  />
</template>
