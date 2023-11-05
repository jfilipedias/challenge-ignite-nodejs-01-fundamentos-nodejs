function getQueryParams(query) {
  return query
    .substr(1)
    .split('&')
    .reduce((param, queryParams) => {
      const [key, value] = param.split('=')
      queryParams[key] = value
      return queryParams
    }, {})
}

export function parseReq(route, req) {
  const routeParams = req.url.match(route.path)
  const { query, ...params } = routeParams.groups
  req.params = params
  req.query = query ? getQueryParams(query) : {}
}