import './config/module-alias'

void (async () => {
  const PORT = 3333
  const { setupApp } = await import('./config/app')
  const app = await setupApp()
  app.listen(PORT, () => console.log(`[SERVER UP AND RUNNING ON][http://localhost:${PORT}]`))
})()
