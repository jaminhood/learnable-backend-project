const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: [true, "Please add a name"],
		},
		email: {
			type: String,
			required: [true, "Please add an email"],
			unique: true,
			trim: true,
			match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please enter a valid email"],
		},
		role: {
			type: String,
			enum: ["guest", "admin"],
			default: "guest",
		},
		password: {
			type: String,
			required: [true, "Please add a password"],
		},
	},
	{
		timestamps: true,
		minimize: false,
	},
)

// Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next()
	}

	// Hash password
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(this.password, salt)
	this.password = hashedPassword
	next()
})

const User = mongoose.model("User", userSchema)
module.exports = User
