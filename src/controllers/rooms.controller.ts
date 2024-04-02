const asyncHandler = require("express-async-handler")
const Room = require(`../models/room.model`)

const getRoom = asyncHandler(async (req: any, res: any) => {
	try {
		const room = await Room.findById(req.params.roomId)

		res.status(200).json({
			success: true,
			message: `Room fetched successfully`,
			data: room,
		})
	} catch (e) {
		res.status(500).json(e)
	}
})

const getRooms = asyncHandler(async (req: any, res: any) => {
	try {
		let _rooms: any = []
		const rooms = await Room.find()

		if (Object.keys(req.query).length > 0) {
			if (req.query.search) {
				const search = rooms.filter((room: any) => room.name.toLowerCase().includes(req.query.search.toLowerCase()))
				_rooms = [..._rooms, ...search]
			}

			if (req.query.roomType) {
				const roomType = rooms.filter((room: any) => room.roomType.toLowerCase().includes(req.query.roomType.toLowerCase()))
				_rooms = [..._rooms, ...roomType]
			}

			if (req.query.minPrice) {
				const minPrice = rooms.filter((room: any) => Number(room.price) >= Number(req.query.minPrice))
				_rooms = [..._rooms, ...minPrice]
			}

			if (req.query.maxPrice) {
				const maxPrice = rooms.filter((room: any) => Number(room.price) <= Number(req.query.maxPrice))
				_rooms = [..._rooms, ...maxPrice]
			}
		}

		res.status(200).json({
			success: true,
			message: `Rooms fetched successfully`,
			data: _rooms.length > 0 ? _rooms : rooms,
		})
	} catch (e) {
		res.status(500).json(e)
	}
})

const storeRoom = asyncHandler(async (req: any, res: any) => {
	try {
		const _room = new Room(req.body)
		const savedRoom = await _room.save()

		res.status(201).json({
			success: true,
			message: `Room stored successfully`,
			data: savedRoom,
		})
	} catch (e) {
		res.status(500).json(e)
	}
})

const editRoom = asyncHandler(async (req: any, res: any) => {
	try {
		const _room = await Room.findByIdAndUpdate(req.params.roomId, { $set: req.body }, { new: true })

		res.status(201).json({
			success: true,
			message: `Room Updated successfully`,
			data: _room,
		})
	} catch (e) {
		res.status(500).json(e)
	}
})

const deleteRoom = asyncHandler(async (req: any, res: any) => {
	const { roomId } = req.params

	try {
		const _room = await Room.findByIdAndDelete(roomId)

		res.status(201).json({
			success: true,
			message: `Room deleted successfully`,
			data: _room,
		})
	} catch (e) {
		res.status(500).json(e)
	}
})

module.exports = { getRoom, getRooms, storeRoom, editRoom, deleteRoom }
