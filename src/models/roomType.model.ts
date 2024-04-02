const mongoose = require(`mongoose`)

const RoomTypeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
)

const RoomType = mongoose.model(`RoomType`, RoomTypeSchema)
module.exports = RoomType
