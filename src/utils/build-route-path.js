export function buildRoutePath(path) {
  const routeParamsRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParamsRegex, '(?<$1>[a-z0-9\-_]+)')
  console.log({ pathWithParams })
  
  return new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
}