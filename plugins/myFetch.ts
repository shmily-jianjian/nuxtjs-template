import { useGlobalStore } from "~/store/global";
import { useUserStore } from "~/store/user";

function getMsgToStatus(status: number) {
  const msgMap = new Map([
    [400, "错误请求"],
    [401, "请求未授权"],
    [404, "请求路径不存在"],
    [405, "请求方法不允许"],
    [500, "服务器异常"],
    [500, "服务器异常"],
  ]);
  return msgMap.get(status);
}

export default defineNuxtPlugin((nuxtApp) => {
  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);

  const globalStore = useGlobalStore();
  const { globalState } = storeToRefs(globalStore);

  const { logout } = useLogout();
  const { jumpToLogin } = useLogin();

  const myFetch = $fetch.create({
    onRequest({ options }) {
      const { token, user_id, real_name } = userInfo.value;
      options.headers.set("token", token);
      options.headers.set("userId", user_id);
      options.headers.set("realName", encodeURIComponent(real_name));

      const { game, region } = globalState.value;
      options.headers.set("DOD-OSS-GAME", game);
      options.headers.set("DOD-OSS-REGION", region);
    },
    async onResponseError({ response }) {
      const { status, _data } = response;
      if (status !== 200) {
        const message = getMsgToStatus(Number(status));
        if (message) {
          ElNotification({
            message,
            type: "error",
            duration: 3000,
          });
          return;
        }
      }
      if (_data.code && _data.code !== "0") {
        if (_data.message) {
          ElMessage.error(_data?.message);
        }
        if (_data.code === "603") {
          await logout();
          jumpToLogin();
        }
      }
    },
  });
  // 通过 useNuxtApp().$myFetch 暴露
  return {
    provide: {
      myFetch,
    },
  };
});
