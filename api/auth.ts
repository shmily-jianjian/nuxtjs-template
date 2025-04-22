// 登录
export async function loginWeb(body: any) {
  return useMyFetch<any>("/main/login", {
    method: "POST",
    body,
  });
}

export async function getProjectInfo(params: any) {
  return useMyFetch<any>("/main/config_by_privilege", {
    method: "GET",
    params,
  });
}
