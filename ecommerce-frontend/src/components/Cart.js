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

  useEffect(() => {
    getCart();
  }, []);

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    props.checkout(false);
  };

  const cartList = cart
    ? cart.map((elm, index) => {
        const item = elm.product;
        const itemTotalPrice = item.price * elm.quantity;
        return (
          <List.Item key={elm.id}>
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
                ${itemTotalPrice.toFixed(2)}
              </Label>
              <Button
                color="red"
                icon="trash"
                onClick={() => deleteCartItem(elm.id)}
              />
            </List.Content>
            <Image avatar src={item.image} />
            <List.Content>{item.model}</List.Content>
            <List.Content>${item.price}</List.Content>
          </List.Item>
        );
      })
    : null;

  const totalPrice = cart
    ? cart.reduce((accumulator, item) => {
        return accumulator + item.product.price * item.quantity;
      }, 0)
    : 0;

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
        <Button color="teal" onClick={handleCheckout}>
          Process Checkout
        </Button>
      </Container>
    </Container>
  );
}
