declare module "nuxt/schema" {
  interface RuntimeConfig {}
  interface PublicRuntimeConfig {
    apiPrefix: string;
    apiUrl: string;
    apiRedirectUrl: string;
  }
}

export {};
