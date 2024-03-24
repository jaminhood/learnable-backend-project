const express = require(`express`)
const { getAllRoomTypes, storeRoomType } = require(`../../controllers/roomTypes.controller`)
const { isAdmin } = require("../../middlewares/auth.middleware")
const { roomTypeValidation } = require("../../middlewares/validate.middleware")
const router = express.Router()

router.route(`/`).get(getAllRoomTypes).post(roomTypeValidation, isAdmin, storeRoomType)

module.exports = router
