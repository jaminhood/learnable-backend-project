const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils")
const User = require("../models/user.model")
const Token = require("../models/token.model")

//REGISTER
const register = asyncHandler(async (req, res) => {
	const { username, email, password, role } = req.body

	// Validation
	if (!username || !email || !password) {
		res.status(400).json({ success: false, message: "Please fill in all the required fields." })
	}

	if (password.length < 6) {
		res.status(400).json({ success: false, message: "Password must be up to 6 characters." })
	}

	// Check if user exists
	const userExists = await User.findOne({ email })

	if (userExists) {
		res.status(400).json({ success: false, message: "User already exist." })
	}

	//   Create new user
	const user = await User.create({ email, username, password, role: role || `guest` })

	//   Generate JWT Token
	const token = generateToken(user._id)

	// Send HTTP-only cookie
	res.cookie("token", token, {
		path: "/",
		httpOnly: true,
		expires: new Date(Date.now() + 1000 * 86400), // 1 day
		sameSite: "none",
		secure: true,
	})

	if (user) {
		const { _id, email, role, username } = user
		res.status(201).json({ _id, username, email, role, token })
	} else {
		res.status(400).json({ success: false, message: "Invalid user data" })
	}
})

// Login User

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	// Validate Request
	if (!email || !password) {
		res.status(400).json({ success: false, message: "Please add email and password" })
	}

	// Check if user exists
	const user = await User.findOne({ email })

	if (!user) {
		res.status(400).json({ success: false, message: "User not found, please signup" })
	}

	// User exists, check if password is correct
	const passwordIsCorrect = await bcrypt.compare(password, user.password)

	if (!passwordIsCorrect) {
		res.status(400).json({ success: false, message: "Invalid email or password" })
	}

	// Delete token if it exists in DB
	let userToken = await Token.findOne({ userId: user._id })
	if (userToken) {
		await userToken.deleteOne()

		// Save Access Token to DB
		await new Token({
			userId: user._id,
			createdAt: Date.now(),
			expiresAt: Date.now() + 60 * (60 * 1000), // Thirty minutes  1hr = 60 * (60 * 1000)
		}).save()
	}

	//   Generate Token
	const token = generateToken(user._id)
	if (user && passwordIsCorrect) {
		// Send HTTP-only cookie
		res.cookie("token", token, {
			path: "/",
			httpOnly: true,
			expires: new Date(Date.now() + 1000 * 86400), // 1 day
			sameSite: "none",
			secure: true,
		})

		const { _id, username, email, role } = user
		res.status(200).json({ _id, username, email, role, token })
	} else {
		res.status(400).json({ success: false, message: "Something went wrong, please try again" })
	}
})

//LOGOUT
const logout = asyncHandler(async (req, res) => {
	res.cookie("token", "", {
		path: "/",
		httpOnly: true,
		expires: new Date(0),
		sameSite: "none",
		secure: true,
	})
	return res.status(200).json("Logout Successful")
})

module.exports = { register, login, logout }
