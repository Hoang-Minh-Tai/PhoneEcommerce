import React, { useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

export default function PaymentForm(props) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentType, setPaymentType] = useState("bank");

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handlePaymentTypeChange = (e, { value }) => {
    setPaymentType(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Implement payment processing logic here
  };

  const handleBackToCartClick = () => {
    props.rollback(true);
  };

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Header as="h2" textAlign="center">
          Enter Payment Information
        </Header>
        <Segment>
          <Form size="large" onSubmit={handleSubmit}>
            <Form.Group inline>
              <label>Payment Type:</label>
              <Form.Radio
                label="PayPal"
                value="paypal"
                checked={paymentType === "paypal"}
                onChange={handlePaymentTypeChange}
              />
              <Form.Radio
                label="Bank"
                value="bank"
                checked={paymentType === "bank"}
                onChange={handlePaymentTypeChange}
              />
            </Form.Group>
            {paymentType === "bank" ? (
              <>
                <Form.Input
                  fluid
                  icon="credit card"
                  iconPosition="left"
                  label="Card Number"
                  placeholder="Card Number"
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  required
                />
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    icon="calendar"
                    iconPosition="left"
                    label="Expiry Date"
                    placeholder="MM/YY"
                    type="text"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    required
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    label="CVV"
                    placeholder="CVV"
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    required
                  />
                </Form.Group>
                <Button color="teal" fluid size="large">
                  Pay ${props.totalPrice.toFixed(2)}
                </Button>
              </>
            ) : (
              <>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  label="Email Address"
                  placeholder="Email Address"
                  type="email"
                  required
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  required
                />
                <Button color="blue" fluid size="large">
                  Login to PayPal
                </Button>
              </>
            )}

            <Button
              color="grey"
              fluid
              size="large"
              onClick={handleBackToCartClick}
            >
              Back to Cart
            </Button>
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}
