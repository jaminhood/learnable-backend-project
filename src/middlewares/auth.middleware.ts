const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const isAdmin = asyncHandler(async (req: any, res: any, next: any) => {
	try {
		const token = req.cookies.token
		if (!token) {
			res.status(401)
			throw new Error("Not authorised, please login")
		}

		// Verify Token
		const verified = jwt.verify(token, process.env.SECRET)
		// Get user id from token
		const user = await User.findById(verified.id).select("-password")

		if (!user) {
			res.status(401)
			throw new Error("User not found")
		}
		if (user.role === "guest") {
			res.status(400)
			throw new Error("User cannot access this route")
		}
		req.user = user
		next()
	} catch (error) {
		res.status(401)
		throw new Error("Not authorised, please login")
	}
})

module.exports = { isAdmin }
