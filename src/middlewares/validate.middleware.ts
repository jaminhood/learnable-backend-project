const asyncHandler = require("express-async-handler")
const Joi = require("joi")

const roomValidation = asyncHandler(async (req: any, res: any, next: any) => {
	try {
		const schema = Joi.object({
			name: Joi.string().alphanum().min(4).required(),
			price: Joi.number().required(),
			roomType: Joi.number().required(),
		})

		const validate = schema.validateAsync(req.body)

		req.body = validate
		next()
	} catch (error) {
		res.status(401)
		throw new Error("Something went wrong")
	}
})

const roomTypeValidation = asyncHandler(async (req: any, res: any, next: any) => {
	try {
		const schema = Joi.object({
			name: Joi.string().alphanum().min(4).required(),
		})

		const validate = schema.validateAsync(req.body)

		req.body = validate
		next()
	} catch (error) {
		res.status(401)
		throw new Error("Something went wrong")
	}
})

const registerValidation = asyncHandler(async (req: any, res: any, next: any) => {
	try {
		const schema = Joi.object({
			username: Joi.string().alphanum().min(4).required(),
			email: Joi.string()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
				.required(),
			password: Joi.string().alphanum().min(4).required(),
			role: Joi.string(),
		})

		const validate = schema.validateAsync(req.body)

		req.body = validate
		next()
	} catch (error) {
		res.status(401)
		throw new Error("Something went wrong")
	}
})

const loginValidation = asyncHandler(async (req: any, res: any, next: any) => {
	try {
		const schema = Joi.object({
			email: Joi.string()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
				.required(),
			password: Joi.string().alphanum().min(4).required(),
		})

		const validate = schema.validateAsync(req.body)

		req.body = validate
		next()
	} catch (error) {
		res.status(401)
		throw new Error("Something went wrong")
	}
})

module.exports = { roomValidation, roomTypeValidation, registerValidation, loginValidation }
