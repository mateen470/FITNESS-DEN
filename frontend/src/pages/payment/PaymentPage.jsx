import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSection from "../../components/payment-section/PaymentSection";

const stripePromise = loadStripe(
  "pk_test_51N42ySFhkQCEON1pdvLmScezqtGF8z1BijVoXA1MsOvs3lLjwVMr79SoEalk0MjdrWgW5m0zIzvY8HbgigsXWTad00LhiO6dbQ"
);

const PaymentPage = () => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentSection />
      </Elements>
    </>
  );
};

export default PaymentPage;
