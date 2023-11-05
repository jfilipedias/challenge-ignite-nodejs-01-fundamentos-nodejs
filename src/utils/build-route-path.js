export function buildRoutePathRegExp(path) {
  const routeParamsRegex = /:([a-zA-Z]+)/g
  const pathWithParamsPattern = path.replaceAll(routeParamsRegex, '(?<$1>[a-z0-9\-_]+)')
  
  return new RegExp(`^${pathWithParamsPattern}(?<query>\\?(.*))?$`)
}