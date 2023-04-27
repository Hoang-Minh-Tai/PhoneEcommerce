import React, { useContext, useState } from "react";
import Cart from "../components/Cart";
import OrderConfirmationModal from "../components/OrderConfirmationModal";
import PaymentForm from "../components/PaymentForm";
import Context from "../config/context";

export default function ShoppingCart() {
  const { addOrder } = useContext(Context);
  const [showCart, setShowCart] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [voucher, setVoucher] = useState(null);
  const [order, setOrder] = useState(null);

  const handlePayment = async (paymentType) => {
    const response = await addOrder(paymentType, voucher);
    setOrder(response);
  };

  return (
    <>
      {order !== null && <OrderConfirmationModal open={true} order={order} />}
      {showCart ? (
        <Cart
          setTotalPrice={setTotalPrice}
          checkout={setShowCart}
          setVoucher={setVoucher}
        ></Cart>
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
