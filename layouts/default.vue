<template>
  <div class="h-screen w-screen">
    <LayoutComponentsBaseHeader />
    <div class="flex h-[calc(100vh-56px)]">
      <LayoutComponentsBaseSide />
      <LayoutComponentsBaseMain>
        <slot />
      </LayoutComponentsBaseMain>
    </div>
  </div>
</template>
