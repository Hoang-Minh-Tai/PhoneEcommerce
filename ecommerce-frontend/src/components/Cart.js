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
  const { cart, deleteCartItem, updateCart, getCart } = useContext(Context);

  const [voucherCode, setVoucherCode] = useState("");

  useEffect(() => {
    getCart();
  }, []);

  const handleCheckout = () => {
    props.setTotalPrice(totalPrice);
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

  const totalPrice = cart
    ? cart.reduce((accumulator, item) => {
        return (
          accumulator +
          ((item.product.price * (100 - item.product.discount.discount)) /
            100) *
            item.quantity
        );
      }, 0)
    : 0;

  const handleVoucherCodeChange = (event) => {
    setVoucherCode(event.target.value);
  };

  const handleApplyVoucherCode = () => {
    // TODO: implement voucher code logic
    console.log(`Voucher code ${voucherCode} applied`);
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
          Total: <Icon name="dollar sign" /> {totalPrice.toFixed(2)}
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
        <br />
        <br />
        <Button color="teal" onClick={handleCheckout}>
          Process Checkout
        </Button>
      </Container>
    </Container>
  );
}
