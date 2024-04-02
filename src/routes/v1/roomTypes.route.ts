const express = require(`express`)
const { getAllRoomTypes, storeRoomType } = require(`../../src/controllers/roomTypes.controller`)
const { isAdmin } = require("../../src/middlewares/auth.middleware")
const { roomTypeValidation } = require("../../src/middlewares/validate.middleware")
const router = express.Router()

router.route(`/`).get(getAllRoomTypes).post(roomTypeValidation, isAdmin, storeRoomType)

module.exports = router
