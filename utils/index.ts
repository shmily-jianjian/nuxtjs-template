import type { RouteRecord } from "vue-router";

/**
 * @param flatRoutes 根据路由信息格式层菜单数据
 * @returns
 */
export function formatMenuTree(flatRoutes: RouteRecord[]) {
  const filterRoutes = flatRoutes
    .filter(
      (route) =>
        route.path.startsWith("/") &&
        route.path !== "/" &&
        !route.meta.hideInMenu
    )
    .map((route) => ({ ...route, children: [] as RouteRecord[] }));
  const pathMap = new Map(filterRoutes.map((route) => [route.path, route]));
  const tree: RouteRecord[] = [];

  filterRoutes.forEach((route) => {
    const pathSegs = route.path.split("/");
    pathSegs.pop();
    const parentPath = pathSegs.join("/") || "/";
    const parent = pathMap.get(parentPath);
    if (parent && parent !== route) {
      parent.children.push(route);
    } else {
      tree.push(route);
    }
  });
  return tree;
}
