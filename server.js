require(`dotenv`).config()
const mongoose = require(`mongoose`)
const app = require(`./app`)
const { logEvents } = require("./middlewares/logger.middleware")

const PORT = process.env.PORT || 5000

mongoose.set(`strictQuery`, true)
mongoose.connection.once(`open`, () => {
	console.log(`=> MongoDB Connection Established!.`)
	app.listen(PORT, () => console.log(`=> Server running on port ${PORT}...`))
})

mongoose.connection.on(`error`, err => {
	console.log(`=> ${err}`)
	logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log")
})
