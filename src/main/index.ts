import './config/module-alias'

import 'reflect-metadata'
import { createConnection } from 'typeorm'

void (async () => {
  try {
    const PORT = 3333
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    await createConnection()
    app.listen(PORT, () => console.log(`[SERVER UP AND RUNNING ON][http://localhost:${PORT}]`))
  } catch (error) {
    console.log('[ERROR]', error)
  }
})()
