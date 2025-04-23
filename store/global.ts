import type { ProjectInfoType } from "~/typings/common";

interface GlobalData {
  allChannel: any[];
  allWorld: any[];
  allProject: ProjectInfoType[];
  operReason: any[];
}

export const initialGlobalState = {
  // 是否是主项目
  isMainProject: true,
  // 选中的游戏项目
  game: "",
  // 选中的区服
  region: "",
};

export const initialGlobalData = {
  // 所有渠道
  allChannel: [],
  // 所有区服
  allWorld: [],
  // 所有的游戏
  allProject: [],
  // 运营原因
  operReason: [],
};

export const useGlobalStore = defineStore(
  "global",
  () => {
    const globalState = reactive({ ...initialGlobalState });
    const isCollapse = ref(false);
    const globalData = reactive<GlobalData>({ ...initialGlobalData });
    // 大区时区
    const timezone = ref("");

    function updateState(newState: Partial<typeof globalState>) {
      Object.assign(globalState, newState);
    }

    return {
      globalState,
      globalData,
      timezone,
      isCollapse,
      updateState,
    };
  },
  {
    persist: [
      {
        storage: piniaPluginPersistedstate.localStorage(),
        pick: ["globalState", "globalData", "timezone"],
      },
      // sessionStorage放在下面优先级 > localStorage
      {
        storage: piniaPluginPersistedstate.sessionStorage(),
        pick: ["globalState", "globalData", "timezone"],
      },
    ],
  }
);
