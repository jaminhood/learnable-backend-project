const { logEvents } = require("./logger.middleware")

const errorHandler = (err: any, req: any, res: any, next: any) => {
	logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, "errLog.log")
	console.log(err.stack)

	const status = res.statusCode ? res.statusCode : 500 // server error

	res.status(status)

	res.json({ message: err.message })
}

module.exports = errorHandler
