<template>
  <div
    class="h-full px-[12px] overflow-auto border-r border-solid border-[rgba(5,5,5,0.06)]"
  >
    <el-menu
      router
      class="mr-[-1px] base-side"
      :default-active="activePath"
      :default-openeds="[]"
      :collapse="isCollapse"
      :collapse-transition="true"
    >
      <Menu :menu-data="menuData" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "~/store/global";
import Menu from "./Menu.vue";

const router = useRouter();
const route = useRoute();
const menuData = computed(() => formatMenuTree(router.getRoutes() || []));
const activePath = computed(() => route.meta?.parentMenu || route.path);

const globalStore = useGlobalStore();
const { isCollapse } = storeToRefs(globalStore);
const { width } = useWindowSize();

watchEffect(() => {
  if (width.value <= 1080) {
    isCollapse.value = true;
  } else {
    isCollapse.value = false;
  }
});
</script>

<style lang="scss" scoped>
.base-side:not(.el-menu--collapse) {
  width: 210px;
}

.base-side:is(.el-menu--collapse) {
  :deep(.iconify) {
    margin-right: 0;
    width: 16px;
    height: 16px;
    visibility: visible;
  }
}

:deep(.el-menu) {
  width: 100%;
  border-right: none;
}

:deep(.el-menu-item) {
  border-radius: 4px;
  margin-bottom: 4px;
}

:deep(.el-menu-item.is-active) {
  background-color: rgba(113, 102, 240, 0.15);
}

:deep(.el-sub-menu) {
  .el-sub-menu__title {
    margin-bottom: 2px;
    border-radius: 6px;
  }
}

:deep(.el-sub-menu.is-active > .el-sub-menu__title) {  
  color: var(--el-color-primary);  
}  
</style>
