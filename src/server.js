import http from 'node:http'

import { json } from './middleware/json'

const server = http.createServer(async (req, res) => {
  await json(req, res)
})

server.listen(3333)
