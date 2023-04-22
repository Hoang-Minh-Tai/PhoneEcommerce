import React from "react";
import { Card, Header } from "semantic-ui-react";

function Voucher(props) {
  const { vouchers } = props;

  return (
    <div>
      <Header as="h2">Vouchers</Header>
      <Card.Group>
        {vouchers.map((voucher) => (
          <Card key={voucher.id}>
            <Card.Content>
              <Card.Header>{voucher.name}</Card.Header>
              <Card.Description>{voucher.description}</Card.Description>
              <Card.Meta>Discount: {voucher.discount}%</Card.Meta>
              <Card.Meta>Code: {voucher.code}</Card.Meta>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

export default Voucher;
