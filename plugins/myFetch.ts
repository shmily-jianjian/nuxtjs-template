export default defineNuxtPlugin((nuxtApp) => {
  const myFetch = $fetch.create({
    onRequest({ request, options, error }) {
      options.headers.set(
        "token",
        "09A828F6B207D23605B2DAC04323B49EBC905A8C9191F992D28ABA1648E0ED70"
      );
      options.headers.set("userId", 1318);
      options.headers.set("realName", encodeURIComponent("赵坚"));
    },
    onResponse({ request, response, options }) {},
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/login"));
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
