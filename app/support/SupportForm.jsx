"use client";

import { useEffect, useMemo, useState } from "react";
import { CardElement, Elements, ExpressCheckoutElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./support.module.css";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

function centsFor(value) {
  if (!/^(?:[1-9]\d{0,2})(?:\.\d{1,2})?$/.test(value)) return null;
  const [dollars, cents = ""] = value.split(".");
  const amount = Number(dollars) * 100 + Number(cents.padEnd(2, "0"));
  return amount >= 100 && amount <= 50000 ? amount : null;
}

async function createIntent(amount) {
  const response = await fetch("/api/support/payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.clientSecret) {
    throw new Error(data.error || "Payment could not be started. Please try again.");
  }
  return data.clientSecret;
}

function PaymentForm({ amount, onAmountChange, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [walletsAvailable, setWalletsAvailable] = useState(false);
  const cents = centsFor(amount);

  useEffect(() => {
    if (elements && cents) elements.update({ amount: cents });
  }, [elements, cents]);

  function handleResult({ error: paymentError, paymentIntent }) {
    if (paymentError) throw paymentError;
    if (paymentIntent?.status === "succeeded") {
      onSuccess();
    } else {
      setError("Your payment is processing. Please check your payment method before trying again.");
    }
  }

  async function payWithCard() {
    if (!stripe || !elements || !cents || processing) return;
    setError("");
    setProcessing(true);

    try {
      const card = elements.getElement(CardElement);
      if (!card) throw new Error("Card details are not ready. Please try again.");
      const clientSecret = await createIntent(amount);
      handleResult(await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      }));
    } catch (paymentError) {
      setError(paymentError.message || "Payment could not be completed. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  async function payWithWallet() {
    if (!stripe || !elements || !cents || processing) return;
    setError("");
    setProcessing(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;
      const clientSecret = await createIntent(amount);
      handleResult(await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: { return_url: `${window.location.origin}/support` },
        redirect: "if_required",
      }));
    } catch (paymentError) {
      setError(paymentError.message || "Payment could not be completed. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className={styles.card}>
      <label className={styles.label} htmlFor="support-amount">One-time amount</label>
      <div className={styles.amountWrap}>
        <span aria-hidden="true">$</span>
        <input
          id="support-amount"
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={amount}
          onChange={(event) => {
            onAmountChange(event.target.value);
            setError("");
          }}
          aria-invalid={!cents}
          aria-describedby="support-amount-hint"
        />
      </div>


      {cents && (
        <div className={styles.paymentArea}>
          <div>
            <ExpressCheckoutElement
              options={{
                buttonHeight: 48,
                paymentMethods: {
                  applePay: "always",
                  googlePay: "always",
                  link: "never",
                  paypal: "never",
                  amazonPay: "never",
                  klarna: "never",
                },
              }}
              onReady={({ availablePaymentMethods }) => setWalletsAvailable(Boolean(availablePaymentMethods && Object.values(availablePaymentMethods).some(Boolean)))}
              onConfirm={payWithWallet}
            />
          </div>

          {walletsAvailable && <p className={styles.divider}><span>or pay with a card</span></p>}

          <form onSubmit={(event) => { event.preventDefault(); payWithCard(); }}>
            <p className={styles.label} id="support-card-label">Card details</p>
            <div className={styles.cardInput} role="group" aria-labelledby="support-card-label">
              <CardElement options={{
                disableLink: true,
                hidePostalCode: true,
                style: {
                  base: { color: "#f6f8ff", fontSize: "16px", "::placeholder": { color: "#aab6d4" } },
                  invalid: { color: "#ff9c9c" },
                },
              }} />
            </div>
            <button className={styles.submit} type="submit" disabled={!stripe || processing}>
              {processing ? "Processing…" : `Support with $${(cents / 100).toFixed(2)}`}
            </button>
          </form>
        </div>
      )}

      {error && <p className={styles.error} role="alert">{error}</p>}
      <p className={styles.secure}>Secure payment by Stripe</p>
    </div>
  );
}

export default function SupportForm() {
  const [amount, setAmount] = useState("5");
  const [success, setSuccess] = useState(false);
  const [returnStatus, setReturnStatus] = useState(null);
  const options = useMemo(() => ({
    mode: "payment",
    amount: 500,
    currency: "usd",
    allowedPaymentMethodTypes: ["card"],
    appearance: {
      theme: "night",
      variables: {
        colorPrimary: "#72d9ff",
        colorBackground: "#17192d",
        colorText: "#f6f8ff",
        colorDanger: "#ff9c9c",
        borderRadius: "10px",
      },
    },
  }), []);

  useEffect(() => {
    const secret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");
    if (!secret || !stripePromise) return;

    stripePromise.then((stripe) => stripe?.retrievePaymentIntent(secret)).then(({ paymentIntent }) => {
      if (paymentIntent?.status === "succeeded") setSuccess(true);
      else setReturnStatus("We could not confirm that payment. Please check your payment method before trying again.");
      window.history.replaceState({}, "", "/support");
    }).catch(() => setReturnStatus("We could not confirm that payment. Please check your payment method before trying again."));
  }, []);

  if (success) return (
    <div className={styles.card} role="status">
      <p className={styles.eyebrow}>Thank you</p>
      <h2>You helped make the next video possible.</h2>
      <p className={styles.thanks}>I appreciate you being here and supporting my work.</p>
    </div>
  );

  if (!stripePromise) return (
    <div className={styles.card}><p>Support payments are temporarily unavailable. Please check back soon.</p></div>
  );

  return (
    <>
      {returnStatus && <p className={styles.error} role="alert">{returnStatus}</p>}
      <Elements stripe={stripePromise} options={options}>
        <PaymentForm amount={amount} onAmountChange={setAmount} onSuccess={() => setSuccess(true)} />
      </Elements>
    </>
  );
}
