<template>
  <div>
    <div>
      <button @click="countStore.changeCount">count is: {{ count }}</button>
    </div>
    <div class="w-[30px] h-[30px] bg-[red]" />
    <div>pos: {{ x }}, {{ y }}</div>
    <Icon class="text-[30px]" name="mdi:home" />
    <Icon class="text-[orange]" name="ep:avatar" />
    <el-select>
      <el-option :key="1" label="哈哈" :value="1" />
    </el-select>
    <el-button type="primary" size="default" @click="handleClick"
      >按钮</el-button
    >




    
    <div class="flex">
      <el-date-picker v-model="dateRange" type="daterange" />
    </div>

    <el-button @click="login">登录</el-button>
  </div>
</template>

<script setup lang="ts">
import { version } from "vue";
import { getProjectInfo, loginWeb } from "~/api/auth";

interface Props {
  age: number;
  sex: string;
}
const countStore = useCountStore();
const dateRange = ref([]);
console.log(version);

const { count } = storeToRefs(countStore);


const handleClick = () => {
  ElMessage.success("点击了按钮");
};
const { x, y } = useMouse();

const login = async() => {
  const token = '09A828F6B207D23605B2DAC04323B49EBC905A8C9191F992D28ABA1648E0ED70'
  const user_id = 1318
  const real_name = '赵坚'
  getProjectInfo({ token, user_id, jwt: '1' })
}

const { data } = useMyFetch<Props>("/mmdb/movie/v3/list/hot.json", {
  method: "GET",
  query: {
    ct: "%E6%B7%B1%E5%9C%B3",
    ci: 30,
    channelId: 4,
  },
  server: false,
});

watchEffect(() => {
  if (!import.meta.server) {
    console.log(data.value);
  }
});
</script>
