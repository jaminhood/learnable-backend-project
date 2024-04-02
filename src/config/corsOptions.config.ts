const allowedOrigins = require(`./allowedOrigins.config`)

const corsOptions = {
	origin: (origin: any, cb: any) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			cb(null, true)
		} else {
			cb(new Error(`=> Not allowed by CORS`))
		}
	},
	credentials: true,
	optionsSuccessStatus: 200,
}

module.exports = corsOptions
