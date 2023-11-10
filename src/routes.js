import { randomUUID } from 'node:crypto'
import { buildRoutePathRegExp } from './utils/build-route-path.js'
import { Database } from './database.js'

const database = new Database()

export const routes = [
  {
    method: 'POST',
    path: buildRoutePathRegExp('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      const now = new Date(Date.now()).toISOString()
      
      database.insert('tasks', {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: now,
        updated_at: now,
      })

      return res.writeHead(201).end()
    }
  },
  {
    method: 'GET',
    path: buildRoutePathRegExp('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select('tasks', search ? {
        title: search,
        description: search,
      } : null)
      
      return res.writeHead(200).end(JSON.stringify(tasks))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePathRegExp('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body  

      const tasks = database.select('tasks', { id: id })

      if (tasks.length === 0) {
        return res.writeHead(404).end()
      }

      const task = tasks[0]

      const updatedTask = {
        ...task,
        updated_at: new Date(Date.now()).toISOString()
      }

      if (title) {
        updatedTask.title = title
      }
      
      if (description) {
        updatedTask.description = description
      }

      database.update('tasks', id, updatedTask)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePathRegExp('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      
      database.delete('tasks', id)

      return res.writeHead(201).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePathRegExp('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const tasks = database.select('tasks', { id: id })

      if (tasks.length === 0) {
        return res.writeHead(404).end()
      }

      const task = tasks[0]

      database.update('tasks', id, {
        ...task,
        completed_at: task.completed_at ? null : new Date(Date.now()).toISOString(),
      })

      return res.writeHead(201).end()
    }
  }
]
