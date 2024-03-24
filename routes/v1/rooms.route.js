const express = require(`express`)
const { getRoom, getRooms, storeRoom, editRoom, deleteRoom } = require(`../../controllers/rooms.controller`)
const { isAdmin } = require("../../middlewares/auth.middleware")
const { roomValidation } = require("../../middlewares/validate.middleware")
const router = express.Router()

router.route(`/`).get(getRooms).post(roomValidation, isAdmin, storeRoom)
router.route(`/:roomId`).get(getRoom).patch(roomValidation, isAdmin, editRoom).delete(isAdmin, deleteRoom)

module.exports = router
