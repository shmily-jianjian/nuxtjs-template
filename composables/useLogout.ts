import { logoutWeb } from "~/api/auth";
import { useUserStore } from "~/store/user";

export function useLogout() {
  const userStore = useUserStore();
  const { userInfo } = storeToRefs(userStore);
  const { user_id, token } = userInfo.value;

  const { clearGlobalStore } = useGlobalData();

  const logout = async () => {
    try {
      const res = await logoutWeb({ s: "SSO.Login.logout", user_id, token });
      userStore.clearUserInfo();
      clearGlobalStore();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    logout,
  };
}
