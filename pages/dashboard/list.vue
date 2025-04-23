<template>
  <div>
    <div className="grid grid-cols-3 gap-4 2xl:grid-cols-4 pt-2">
      <div
        v-for="item in globalData.allProject"
        :key="item.game"
        class="flex justify-center items-center flex-col h-[160px] rounded-lg border-[1px] border-solid border-[#edf1f6] bg-[#fff] transition-all duration-300 hover:border-[var(--el-color-primary)] hover:cursor-pointer"
        @click="handleSelectProject(item)"
      >
        <img class="w-[60px] h-[55px] mb-[24px]" :src="FileIcon" alt="" >
        <span class="text-[#344156] text-[14px]">{{ item.game }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FileIcon from "@/assets/images/file.png";
import { useGlobalStore } from "~/store/global";
import type { ProjectInfoType } from "~/typings/common";

definePageMeta({
  title: "项目列表",
});

const loading = ref(false);
const globalStore = useGlobalStore();
const { globalData } = storeToRefs(globalStore);
async function requestProjectInfo() {
  loading.value = true;
  try {
    await useGlobalData().requestProjectInfo();
  } finally {
    loading.value = false;
  }
}
requestProjectInfo();

function handleSelectProject(item: ProjectInfoType) {
  const firstRegionId = item.region_list[0].region_id;
  const newState = {
    game: item.game,
    region: firstRegionId,
    isMainProject: false,
  };
  globalStore.updateState({...newState})
}
</script>
