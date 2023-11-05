import { buildRoutePathRegExp } from "./utils/build-route-path.js";

export const routes = [
  {
    method: 'POST',
    path: buildRoutePathRegExp('/tasks'),
    handler: (req, res) => {
      return res.writeHead(201).end()
    }
  },
  {
    method: 'GET',
    path: buildRoutePathRegExp('/tasks'),
    handler: (req, res) => {
      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePathRegExp('/tasks/:id'),
    handler: (req, res) => {
      return res.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePathRegExp('/tasks/:id'),
    handler: (req, res) => {
      return res.writeHead(201).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePathRegExp('/tasks/:id/complete'),
    handler: (req, res) => {
      return res.writeHead(201).end()
    }
  }
]
