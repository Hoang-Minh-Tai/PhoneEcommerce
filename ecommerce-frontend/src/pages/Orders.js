import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Grid, Segment, Modal } from "semantic-ui-react";
import OrderDetails from "../components/OrderDetail";
import Context from "../config/context";

export default function Orders() {
  const { orders, getOrders } = useContext(Context);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  const renderOrdersTable = () => (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders.map((order, index) => (
          <>
            <Table.Row key={index} active={selectedIndex === index}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{order.user.username}</Table.Cell>
              <Table.Cell>{order.orderDate}</Table.Cell>
              <Table.Cell>${order.totalPrice}</Table.Cell>
              <Table.Cell>{order.status}</Table.Cell>
              <Table.Cell>
                <Button
                  size="mini"
                  onClick={(e) => {
                    setSelectedIndex(index); // select the order
                  }}
                >
                  Show Order
                </Button>
              </Table.Cell>
            </Table.Row>
            {selectedIndex === index && (
              <OrderDetails order={orders[index]} close={setSelectedIndex} />
            )}
          </>
        ))}
      </Table.Body>
    </Table>
  );

  return (
    <div>
      <h1>Orders</h1>
      {renderOrdersTable()}
    </div>
  );
}
