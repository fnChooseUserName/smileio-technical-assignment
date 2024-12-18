// server.js
import express, { type Express, Request, Response } from "express"
import helmet from "helmet"
import cors from "cors"
import path from "path"

import { env } from "./config/env"

const app:Express = express()
const port = process.env.PORT || 8080
const corsOptions = { origin: env.CORS_ORIGIN, credentials: false }

const staticPath = 'dist'

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

app.use(express.static(path.join(process.cwd(), staticPath)))

app.get('/', (req: Request, res: Response) => {
      //res.send('Hello Express && Typescript')
      res.sendFile(path.join(__dirname + `/pages/index.html`))
})

app.get('/:page', (req: Request, res: Response, next) => {

    let fileName = `${path.join(process.cwd(), staticPath)}/src/pages/${req.params.page}/index.html`
    res.sendFile(fileName, {dotfiles: 'ignore'}, (err) => {
        if(err) {
            next(err)
        } else {
            console.log(`Served ${fileName}`);
        }
    })
})

app.listen(port, () => {
    console.log(`[server.js] Server is running on port ${port}`)
})