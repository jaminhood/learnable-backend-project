const mongoose = require(`mongoose`)

const RoomSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		roomType: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
)

const Room = mongoose.model(`Room`, RoomSchema)
module.exports = Room
