export interface CommonResponse<T = any> {
  code: string;
  message: string;
  data: T;
}

export interface RegionType {
  app_id: number;
  region_name: string;
  desc: string;
  region_id: string;
  url: string;
  domain: string;
}

export interface ProjectInfoType {
  game: string;
  desc: string;
  project_id: number;
  region_list: RegionType[];
}
