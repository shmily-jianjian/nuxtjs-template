export const useCountStore = defineStore(
  "count",
  () => {
    const count = ref(0);

    function changeCount() {
      count.value++;
    }

    return {
      count,
      changeCount,
    };
  },
  {
    persist: [
      {
        storage: piniaPluginPersistedstate.localStorage(),
        pick: ["count"],
      },
      {
        storage: piniaPluginPersistedstate.sessionStorage(),
        pick: ["count"],
      },
    ],
  }
);
