import fs from 'node:fs'
import { parse } from 'csv-parse'

async function main() {
  const path = new URL('./tasks.csv', import.meta.url)
  const stream = fs.createReadStream(path)
  const lines = stream.pipe(parse({
    fromLine: 2
  }))
  
  for await (const row of lines) {
    const [ title, description ] = row

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
      }),
    })
  }
}

main()
