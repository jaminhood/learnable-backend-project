const errorHandlerr = (err: any, req: any, res: any, next: any) => {
	const statusCode = res.statusCode ? res.statusCode : 500
	res.status(statusCode)

	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === "development" ? err.stack : null,
	})
}

module.exports = errorHandlerr
