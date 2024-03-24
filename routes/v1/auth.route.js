const express = require("express")
const { register, login, logout } = require("../../controllers/auth.controller")
const { registerValidation, loginValidation } = require("../../middlewares/validate.middleware")
const router = express.Router()

// Routes
router.post("/register", registerValidation, register)
router.post("/login", loginValidation, login)
router.post("/logout", logout)

module.exports = router
