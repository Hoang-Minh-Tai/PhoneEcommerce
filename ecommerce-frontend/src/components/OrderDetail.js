import React, { useContext, useState } from "react";
import { Table, Button, Modal } from "semantic-ui-react";
import Context from "../config/context";

export default function OrderDetails({ order, close }) {
  const { updateOrder } = useContext(Context);

  function handleAccept(id) {
    updateOrder(id, "ACCEPTED");
  }

  function handleCancel(id) {
    updateOrder(id, "REJECTED");
  }

  return (
    <Modal open>
      <Modal.Header>Order Details</Modal.Header>
      <Modal.Content>
        <p>
          <strong>User: </strong> {order.user.username}
        </p>
        <p>
          <strong>Payment Type: </strong> {order.paymentType}
        </p>
        <p>
          <strong>Order Date: </strong> {order.orderDate}
        </p>
        <p>
          <strong>Total Price: </strong> ${order.totalPrice.toFixed(2)}
        </p>
        <p>
          <strong>Order Status: </strong> {order.status}
        </p>
        <p>
          <strong>Order Voucher: </strong>{" "}
          {order.voucher
            ? order.voucher.code + "(" + order.voucher.discount + "%)"
            : "null"}
        </p>
        <h3>Products:</h3>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {order.products.map((elm, index) => (
              <Table.Row key={index}>
                <Table.Cell>{elm.product.model}</Table.Cell>
                <Table.Cell>{elm.quantity}</Table.Cell>
                <Table.Cell>${elm.product.price.toFixed(2)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => handleAccept(order.id)}>
          Accept Order
        </Button>
        <Button color="red" onClick={() => handleCancel(order.id)}>
          Cancel Order
        </Button>
        <Button onClick={() => close(null)}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
}
