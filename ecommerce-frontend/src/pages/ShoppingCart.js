import React, { useContext, useState } from "react";
import Cart from "../components/Cart";
import PaymentForm from "../components/PaymentForm";
import Context from "../config/context";

export default function ShoppingCart() {
  const { addOrder } = useContext(Context);
  const [showCart, setShowCart] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const handlePayment = (paymentType) => {
    console.log("he pays, he pays");
    addOrder(paymentType);
  };

  return (
    <>
      {showCart ? (
        <Cart setTotalPrice={setTotalPrice} checkout={setShowCart}></Cart>
      ) : (
        <PaymentForm
          totalPrice={totalPrice}
          rollback={setShowCart}
          process={handlePayment}
        ></PaymentForm>
      )}
    </>
  );
}
