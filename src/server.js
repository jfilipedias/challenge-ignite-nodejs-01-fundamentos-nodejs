import http from 'node:http'

import { json } from './middleware/json.js'
import { parseReq } from './middleware/parse-req.js'
import { routes } from './routes.js'

const server = http.createServer(async (req, res) => {
  await json(req, res)

  const { method, url} = req
  const route = routes.find(
    (route) => route.method === method && route.path.test(url)
  )

  if (route) {
    parseReq(route, req)
    return route.handler(req, res)
  }

  return res.writeHead(404).end()
})

server.listen(3333)
