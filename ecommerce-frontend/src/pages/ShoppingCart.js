import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Input,
  Image,
  Label,
  List,
} from "semantic-ui-react";
import Cart from "../components/Cart";
import PaymentForm from "../components/PaymentForm";
import Context from "../config/context";

export default function ShoppingCart() {
  const { user } = useContext(Context);
  const [showCart, setShowCart] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCheckout = () => {
    // TODO: Implement checkout logic
  };

  return (
    <>
      {showCart ? (
        <Cart setTotalPrice={setTotalPrice} checkout={setShowCart}></Cart>
      ) : (
        <PaymentForm
          totalPrice={totalPrice}
          rollback={setShowCart}
        ></PaymentForm>
      )}
    </>
  );
}
