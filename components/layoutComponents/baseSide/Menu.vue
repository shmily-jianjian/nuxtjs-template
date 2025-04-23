<template>
  <template v-for="item in menuData" :key="item.path">
    <el-sub-menu v-if="item.children?.length" :index="item.path">
      <template #title>
        <Icon
          v-if="item.meta?.icon"
          class="mr-2 size-4"
          :name="item.meta?.icon"
        />
        <span>{{ item.meta?.title }}</span>
      </template>
      <LayoutComponentsBaseSideMenu :menu-data="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">
      <Icon
        v-if="item.meta?.icon"
        class="mr-2 siez-4"
        :name="item.meta?.icon"
      />
      <span>{{ item.meta?.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from "vue-router";

interface Props {
  menuData?: Array<RouteRecordRaw>;
}

withDefaults(defineProps<Props>(), {
  menuData: () => [],
});
</script>
