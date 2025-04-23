import {
  getAllChannel,
  getAllWorld,
  getOperReason,
  getProjectInfo,
  getTimeZone,
} from "~/api/common";
import {
  initialGlobalData,
  initialGlobalState,
  useGlobalStore,
} from "~/store/global";
import { useUserStore } from "~/store/user";

export function useGlobalData() {
  const { jumpToLogin } = useLogin();
  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);

  const globalStore = useGlobalStore();
  const { timezone, globalData, globalState } = storeToRefs(globalStore);

  const requestProjectInfo = async () => {
    try {
      const { user_id, token } = userInfo.value;
      const { data } = await getProjectInfo({
        token,
        user_id,
      });
      if (data.value?.code === "0") {
        const formatData = JSON.parse(data.value.data || "[]") || [];
        if (!formatData.length) {
          jumpToLogin();
          return;
        }
        globalStore.globalData.allProject = formatData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestAllChannel = async () => {
    try {
      const { game, region } = globalState.value;
      const { data } = await getAllChannel(game, region);
      if (data.value?.code === "0") {
        const formatData = (JSON.parse(data.value.data || "[]") || []).map(
          (item: any) => ({ label: item, value: item })
        );
        globalData.value.allChannel = formatData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestAllWorld = async () => {
    try {
      const { game, region } = globalState.value;
      const { data } = await getAllWorld(game, region);
      if (data.value?.code === "0") {
        const formatData = (JSON.parse(data.value.data || "[]") || []).map(
          (item: any) => ({ label: item, value: item })
        );
        globalData.value.allWorld = formatData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestOperReason = async () => {
    try {
      const { game, region } = globalState.value;
      const { data } = await getOperReason(game, region);
      if (data.value?.code === "0") {
        globalData.value.operReason = JSON.parse(data.value.data || "[]") || [];
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestTimezone = async () => {
    try {
      const { game, region } = globalState.value;
      const { data } = await getTimeZone(game, region);
      if (data.value?.code === "0") {
        timezone.value = data.value.data?.utc_offset_hours;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestAllGlobalData = () => {
    requestAllChannel();
    requestAllWorld();
    requestOperReason();
    requestTimezone();
  };

  const clearGlobalStore = () => {
    globalData.value = { ...initialGlobalData };
    globalState.value = { ...initialGlobalState };
  };

  return {
    requestProjectInfo,
    requestAllChannel,
    requestAllWorld,
    requestOperReason,
    requestTimezone,
    requestAllGlobalData,
    clearGlobalStore,
  };
}
