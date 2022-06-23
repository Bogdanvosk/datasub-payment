import styles from '../styles/Form.module.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import React from 'react';
import axios from 'axios';
import InputMask from "react-input-mask";

const schema = yup.object().shape({
  cardNumber: yup.string().test('len', 'Must be exactly 16 digits', val => val.length === 19).required('Card number is required field'),
  expDate: yup.string().test('expDate', 'Enter correct expiration date, please', val => {
    const arr = val.split('/')

    const date = new Date()

    if (+arr[0] > 12 || arr[0] === '00') return false
    if (+arr[1] < date.getFullYear() || (+arr[1] === date.getFullYear() && +arr[0] < date.getMonth() + 1)) return false
    else return true
  }).required('Expiration Date is required field'),
  cvv: yup.string().test('len', 'Must be exactly 3 digits', val => val.length === 3).required(),
  amount: yup.string().required('Amount is required field')
});


export default function App() {


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    const obj = {
      CardNumber: data.cardNumber,
      ExpDate: data.expDate,
      Cvv: data.cvv,
      Amount: +data.amount
    }
    axios.post('http://localhost:5555/payments', obj).then(() => reset())

  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label htmlFor="cardNumber">Card number</label>
          <InputMask id="cardNumber" mask="9999 9999 9999 9999" maskChar={null} {...register("cardNumber")} />
          {errors.cardNumber && <p className={styles.error}>{errors.cardNumber.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="expDate">Expiration date</label>
          <InputMask id="expDate" maskChar={null} mask="99/9999" {...register("expDate")} />
          {errors.expDate && <p className={styles.error}>{errors.expDate.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="cvv">CVV</label>
          <InputMask id="cvv" mask="999" maskChar={null} {...register("cvv")} />
          {errors.cvv && <p className={styles.error}>{errors.cvv.message}</p>}
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="amount">Amount</label>
          <input type="number" {...register("amount", { required: true })} />
          {errors.amount && <p className={styles.error}>{errors.amount.message}</p>}
        </div>

        <button className={Object.keys(errors).length > 0 ? styles.button + ' ' + styles.disabled : styles.button} disabled={Object.keys(errors).length > 0} type="submit">Sumbit</button>
      </form>
    </div>
  );
}
