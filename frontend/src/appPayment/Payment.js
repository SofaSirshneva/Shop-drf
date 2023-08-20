import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState} from "react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import { useParams } from 'react-router-dom';
import CartClean from "../appCart/CartClean";
const stripePromise = loadStripe('pk_test_51Nh72ZAfQm8BjnDHlGHek3iYhlQ9j15WBjZqsAm2QICSXczfcEJD8y8uDa4yikabBeYs7yawCkSLxdUMpo5wCbKX00MwKQNvIg');

const Payment = (props) => (
    <Elements stripe={stripePromise}>
      <Comp />
    </Elements>
  );

  function getCookie(name) {
    if (!document.cookie) {
      return null;
    }
    const token = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith(name + '='));

    if (token.length === 0) {
      return null;
    }
    return decodeURIComponent(token[0].split('=')[1]);
  }

const Comp = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();

  const handleChange = (event) => {
  if (event.error) {
    setError(event.error.message);
  } else {
    setError(null);
  }
}

// Handle form submission.
const handleSubmit = async (event) => {
  event.preventDefault();
  const card = elements.getElement(CardElement);

  const {paymentMethod, error} = await stripe.createPaymentMethod({
    type: 'card',
    card: card
  });

  fetch('http://127.0.0.1:8000/payment/', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify({
        email, payment_method_id: paymentMethod.id,
        price: params.price
    }),
    credentials: 'include',
  })
  .then((response) => response.json())
  .then((data) =>  {
      alert('Оплата совершена!');
      CartClean();
      window.location.replace("http://127.0.0.1:3000/");
  })
};

return (
  <main className="form-signin m-auto">
    <h5>К оплате {params.price} руб.</h5>
  <form onSubmit={handleSubmit}>
    <div className="form-row">
      <label htmlFor="email">Адрес электронной почты:</label><br/>
      <input className="form-control" style={{ width: '300px'}} id="email" name="name" type="email" placeholder="jenny.rosen@example.com" required
        value={email} onChange={(event) => { setEmail(event.target.value); } } />
    </div>
    <br/>
    <div className="form-row">
      <label htmlFor="card-element">Данные для оплаты:</label>
      <CardElement id="card-element" onChange={handleChange} />
      <div className="card-errors" role="alert">{error}</div>
    </div><br/>
    <button type="submit" className="btn btn-info">
      Submit Payment
    </button>
  </form></main> );
};

export default Payment;