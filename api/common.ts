import type { CommonResponse } from "~/typings/common";

// 获取游戏大区配置信息
export function getProjectInfo(params: any) {
  return useMyFetch<CommonResponse>("/main/config_by_privilege", {
    method: "GET",
    params,
  });
}

// 获取服列表
export function getAllWorld(game: string, region: string) {
  return useMyFetch<CommonResponse>(`/gr/${game}/${region}/all_unmerge_world`, {
    method: "GET",
  });
}

// 获取渠道列表
export function getAllChannel(game: string, region: string) {
  return useMyFetch<CommonResponse>(`/gr/${game}/${region}/all_channel`, {
    method: "GET",
  });
}

// 获取大区时区
export function getTimeZone(game: string, region: string) {
  return useMyFetch<CommonResponse>(
    `/gr/v2/${game}/${region}/manager/timezone`,
    {
      method: "GET",
    }
  );
}

// 获取运营原因
export function getOperReason(game: string, region: string) {
  return useMyFetch<CommonResponse>(`/gr/${game}/${region}/get_oper_reason`, {
    method: "GET",
  });
}
