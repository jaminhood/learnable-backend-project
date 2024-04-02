const jwt = require("jsonwebtoken")
const crypto = require("crypto")

// Generate Token
const generateToken = (id: any) => {
	return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" })
}

// Hash Token
const hashToken = (token: any) => {
	return crypto.createHash("sha256").update(token.toString()).digest("hex")
}

module.exports = {
	generateToken,
	hashToken,
}
