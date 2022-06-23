import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { create } from './controllers/paymentController.js'

const app = express()

app.use(express.json())
app.use(cors())

mongoose
	.connect('mongodb+srv://admin:pajnvAmEigNMu2G9@cluster0.scavage.mongodb.net/payments?retryWrites=true&w=majority')
	.then(() => console.log('DB is OK'))
	.catch((err) => console.log('DB error', err))

app.post('/payments', create);

app.get('/payments', async (req, res) => {
	const payments = await PaymentModel.find()

	res.json(payments)
})

app.listen('5555', () => {
	console.log('Server is running...');
})