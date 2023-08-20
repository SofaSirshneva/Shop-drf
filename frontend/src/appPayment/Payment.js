import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import React, {useState} from "react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
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

  const handleChange = (event) => {
  if (event.error) {
    setError(event.error.message);
  } else {
    setError(null);
  }
  //console.log(props.location)
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
        email, payment_method_id: paymentMethod.id
    }),
    credentials: 'include',})
};

return (
  <form onSubmit={handleSubmit} className="stripe-form">
    <div className="form-row">
      <label htmlFor="email">Email Address</label>
      <input className="form-input" id="email" name="name" type="email" placeholder="jenny.rosen@example.com" required 
value={email} onChange={(event) => { setEmail(event.target.value)}} />
    </div>
    <div className="form-row">
      <label htmlFor="card-element">Credit or debit card</label> 
      <CardElement id="card-element" onChange={handleChange}/>
      <div className="card-errors" role="alert">{error}</div>
    </div>
    <button type="submit" className="submit-btn">
      Submit Payment
    </button>
  </form> );
};

export default Payment;