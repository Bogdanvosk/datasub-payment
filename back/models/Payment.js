import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
	CardNumber: {
		type: String,
		unique: true,
		required: true
	},
	ExpDate: {
		type: String,
		required: true
	},
	Cvv: {
		type: String,
		unique: true,
		required: true
	},
	Amount: {
		type: Number,
		required: true,
		unique: false
	}
})

export default mongoose.model('Payment', PaymentSchema)