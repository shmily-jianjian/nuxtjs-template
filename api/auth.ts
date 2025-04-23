import type { CommonResponse } from "~/typings/common";

export function loginWeb(params: any) {
  return useMyFetch<CommonResponse>("/main/login", {
    method: "GET",
    params,
  });
}

export function logoutWeb(params: any) {
  return useMyFetch<any>("/", { params, baseURL: "/api3", method: "POST" });
}
