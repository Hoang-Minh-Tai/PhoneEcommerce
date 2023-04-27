import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Header, List, Table } from "semantic-ui-react";

const OrderConfirmationModal = ({ open, onClose, order }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Thank you for your purchase!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Your order details:</Header>
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
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Link to={"/"}>
          <Button color="green" onClick={onClose} inverted>
            Close
          </Button>
        </Link>
      </Modal.Actions>
    </Modal>
  );
};

export default OrderConfirmationModal;
