declare module "nuxt/schema" {
  interface RuntimeConfig {}
  interface PublicRuntimeConfig {
    apiPrefix: string;
    apiUrl: string;
    apiRedirectUrl: string;
    loginUrl: string;
  }
}

declare module "#app" {
  interface PageMeta {
    icon?: string;
    title?: string;
    permissionCode?: string;
    hideInMenu?: boolean;
    parentMenu?: string;
  }
}

export {};
