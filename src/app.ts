require(`dotenv`).config()
const express = require(`express`)
const cors = require(`cors`)
const mongoSanitize = require(`express-mongo-sanitize`)
const bodyParser = require(`body-parser`)

const app = express()
const path = require(`path`)

const corsOptions = require(`./config/corsOptions.config`)
const connectDB = require(`./config/dbConn.config`)
const { logger } = require("./middlewares/logger.middleware")
const errorHandler = require("./middlewares/errorHandler.middleware")
const errorHandlerr = require("./middlewares/error.middleware")

connectDB()
app.use(cors(corsOptions))
app.use(logger)
app.use(errorHandler)
app.use(errorHandlerr)

app.use(express.json({ limit: `30mb`, extended: true }))
app.use(express.urlencoded({ limit: `30mb`, extended: false }))
app.use(bodyParser.json())

// Prevent SQL injection
app.use(mongoSanitize())

// Routes
app.use(`/`, express.static(path.join(__dirname, `public`)))

app.use(`/`, require(`../routes/root.route`))
app.use(`/api/v1`, require(`../routes/v1`))

app.all(`*`, (req: any, res: any) => {
	res.status(404)
	if (req.accepts(`html`)) {
		res.sendFile(path.join(__dirname, `views`, `404.html`))
	} else if (req.accepts(`json`)) {
		res.json({ message: `404 Not Found` })
	} else {
		res.type(`txt`).send(`404 Not Found`)
	}
})

module.exports = app
