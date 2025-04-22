<template>
  <div class="h-[56px] w-full border-b border-solid border-[rgba(5,5,5,0.06)] flex items-center">
    <Logo />
    <div class="flex items-center gap-4 justify-between flex-1 pr-2">
      <div />
      <div class="flex items-center gap-4">
        <MenuSearch />
        <Icon v-if="isFullscreen" class="text-[20px] cursor-pointer"   name="ant-design:fullscreen-exit-outlined" @click="toggle" />
        <Icon v-else class="text-[20px] cursor-pointer" name="ant-design:fullscreen-outlined" @click="toggle" />
        <span>zhaojian</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue';
import MenuSearch from './MenuSearch.vue';

const { isFullscreen,  toggle} = useFullscreen()

const router= useRouter()
console.log(router.getRoutes());


</script>