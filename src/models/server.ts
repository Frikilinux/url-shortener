import express, { Express } from 'express'
import shortenRoutes from '../routes/shorten'
import { connect } from '../config/mongoDb'

class Server {
  app: Express
  port: number | string | undefined

  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3001
    this.middlewares()
    this.routes()
    this.connectDB()
  }

  connectDB = async (): Promise<void> => {
    await connect()
  }

  middlewares = () => {
    this.app.use(express.json())
  }

  listen = () => {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }

  routes = () => {
    this.app.use('/shorten', shortenRoutes)
  }
}

export default Server
