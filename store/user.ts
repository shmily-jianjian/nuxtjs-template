interface UserInfo {
  token: string;
  real_name: string;
  user_id: string;
  permissions: any[];
}

export const initUserInfo: UserInfo = {
  token: "",
  real_name: "",
  user_id: "",
  permissions: [],
};

export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = reactive<UserInfo>({ ...initUserInfo });

    const setUserInfo = (data: any) => {
      Object.assign(userInfo, data);
    };

    const clearUserInfo = () => {
      Object.assign(userInfo, initUserInfo);
    };

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: [
      {
        storage: piniaPluginPersistedstate.localStorage(),
        pick: ["userInfo"],
      },
      {
        storage: piniaPluginPersistedstate.sessionStorage(),
        pick: ["userInfo"],
      },
    ],
  }
);
