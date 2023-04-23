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
import Context from "../config/context";

export default function Cart(props) {
  const { cart, deleteCartItem, updateCart, getCart, getOneVoucher } =
    useContext(Context);

  const [voucherCode, setVoucherCode] = useState("");
  const [voucher, setVoucher] = useState(null);

  useEffect(() => {
    getCart();
  }, []);

  const handleCheckout = () => {
    props.setTotalPrice(totalPrice - discountAmount);
    props.setVoucher(voucher);
    props.checkout(false);
  };

  const cartList = cart
    ? cart.map((elm, index) => {
        const item = elm.product;
        const itemTotalPrice = item.price * elm.quantity;
        const discount = item.discount.discount;
        return (
          <List.Item key={index}>
            <List.Content floated="right">
              <Input
                type="number"
                min={1}
                value={elm.quantity}
                onChange={(event) =>
                  updateCart(elm.id, parseInt(event.target.value))
                }
                style={{ width: "60px" }}
              />
              <Label color="green" tag>
                ${((item.price * (100 - discount)) / 100).toFixed(2)}
              </Label>
              <Button
                color="red"
                icon="trash"
                onClick={() => deleteCartItem(elm.id)}
              />
            </List.Content>
            <Image avatar src={item.imageUrl} />
            <List.Content>{item.model}</List.Content>
            {/* <List.Content>{item.brand}</List.Content>
            <List.Content>${item.price.toFixed(2)}</List.Content> */}
            <List.Content>Discount: {discount}%</List.Content>
          </List.Item>
        );
      })
    : null;

  let totalPrice = cart
    ? cart.reduce((accumulator, item) => {
        return (
          accumulator +
          ((item.product.price * (100 - item.product.discount.discount)) /
            100) *
            item.quantity
        );
      }, 0)
    : 0;

  const discountAmount = voucher ? (totalPrice * voucher.discount) / 100 : 0;
  const handleVoucherCodeChange = (event) => {
    setVoucherCode(event.target.value);
  };

  const handleApplyVoucherCode = async () => {
    const voucher = await getOneVoucher(voucherCode);
    setVoucher(voucher);
  };

  return (
    <Container>
      <Header as="h2" textAlign="center">
        Shopping Cart
      </Header>
      <Segment>
        <List divided verticalAlign="middle">
          {cartList}
        </List>
      </Segment>
      <Container textAlign="right">
        <Header as="h3">
          Total: <Icon name="dollar sign" />{" "}
          {(totalPrice - discountAmount).toFixed(2)}
        </Header>
      </Container>
      <Container textAlign="center">
        <Input
          placeholder="Enter voucher code"
          value={voucherCode}
          onChange={handleVoucherCodeChange}
          style={{ marginRight: "10px" }}
        />
        <Button color="teal" onClick={handleApplyVoucherCode}>
          Apply Voucher Code
        </Button>
        {discountAmount > 0 && (
          <div style={{ color: "green", marginTop: "10px" }}>
            Voucher applied. Discount amount: <Icon name="dollar sign" />
            {discountAmount.toFixed(2)}. Total price:{" "}
            <Icon name="dollar sign" />
            {(totalPrice - discountAmount).toFixed(2)}
          </div>
        )}
        <br />
        <Button color="teal" onClick={handleCheckout}>
          Process Checkout
        </Button>
      </Container>
    </Container>
  );
}
