const express = require(`express`)
const router = express.Router()

router.use(`/rooms`, require(`./rooms.route`))
router.use(`/rooms-types`, require(`./roomTypes.route`))

module.exports = router
