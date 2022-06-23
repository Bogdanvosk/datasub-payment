import PaymentModel from '../models/Payment.js'

export const create = async (req, res) => {
	try {
		const doc = new PaymentModel({
			CardNumber: req.body.CardNumber,
			ExpDate: req.body.ExpDate,
			Cvv: req.body.Cvv,
			Amount: req.body.Amount
		})

		const payment = await doc.save()

		const { Amount, _id } = payment;

		res.json({ Amount, RequestId: _id })

	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'Не удалось произвести оплату'
		})
	}

}