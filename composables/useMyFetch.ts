import type { UseFetchOptions } from "nuxt/app";

export function useMyFetch<T = any>(
  url: string | (() => string) | Ref<string>,
  options?: UseFetchOptions<T>
) {
  const runtimeConfig = useRuntimeConfig();
  return useFetch(url, {
    baseURL: runtimeConfig.public.apiPrefix,
    ...options,
    $fetch: useNuxtApp().$myFetch,
  });
}
