const asyncHandler = require(`express-async-handler`)
const RoomType = require(`../models/roomType.model`)

const getAllRoomTypes = asyncHandler(async (req: any, res: any) => {
	try {
		const roomTypes = await RoomType.find()

		res.status(200).json({
			success: true,
			message: `Room Types fetched successfully`,
			data: roomTypes,
		})
	} catch (e) {
		res.status(500).json(e)
	}
})

const storeRoomType = asyncHandler(async (req: any, res: any) => {
	try {
		const _roomType = new RoomType(req.body)
		const savedRoomType = await _roomType.save()

		res.status(201).json({
			success: true,
			message: `Room Type stored successfully`,
			data: savedRoomType,
		})
	} catch (e) {
		res.status(500).json(e)
	}
})

module.exports = { getAllRoomTypes, storeRoomType }
