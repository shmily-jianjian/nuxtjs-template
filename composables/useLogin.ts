export function useLogin() {
  const runTimeConfig = useRuntimeConfig();
  const { apiRedirectUrl, loginUrl } = runTimeConfig.public;

  const jumpToLogin = () => {
    const url = `${loginUrl}?redirectUrl=${apiRedirectUrl}`;
    window.location.href = url;
  };

  return {
    jumpToLogin,
  };
}
