// server.js
import express, { type Express, Request, Response } from "express"
import helmet from "helmet"
import cors from "cors"
import path from "path"
import crypto from "crypto"
const jwt = require('jsonwebtoken')

import { env } from "./config/env"




const app:Express = express()
const port = process.env.PORT || 8080
const corsOptions = { origin: env.CORS_ORIGIN, credentials: false }

app.set("trust proxy", true)

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions))
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            "script-src": ["'self'", "http://localhost:3000/", "'unsafe-inline'", "'unsafe-eval'", "js.smile.io"],
            "connect-src": ["http://*.smile.io"]
        }
    }
}))

app.get('/', (req: Request, res: Response) => {
      res.send('Hello Express && Typescript')
})

app.listen(port, () => {
    console.log(`[server.js] Server is running on port ${port}`)
})