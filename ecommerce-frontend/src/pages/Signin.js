import React, { useContext, useState } from "react";

import { Redirect } from "react-router-dom";

import { Card, Header, Button, Form, Label } from "semantic-ui-react";


import Context from "../config/context";

export default function Signin() {
  const { user, addUser } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("other");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [error, setError] = useState("");

  const handleChangeName = (e, { value }) => setName(value);
  const handleChangeEmail = (e, { value }) => setEmail(value);
  const handleChangePassword = (e, { value }) => setPassword(value);
  const handleChangeGender = (e, { value }) => setGender(value);
  const handleChangePhoneNumber = (e, { value }) => setPhoneNumber(value);
  const handleChangeShippingAddress = (e, { value }) =>
    setShippingAddress(value);

  const handleSubmit = () => {
    const newUser = {
      username: name,
      email: email,
      password: password,
      gender: gender.toUpperCase(),
      phone_number: phoneNumber,
      shipping_address: shippingAddress,
      is_admin: false,
    };

    addUser(newUser);
  };

  const view = user ? (
    <Redirect to="/" />
  ) : (
    <Card fluid>
      <Card.Content>
        <Header textAlign="center">Welcome to eCommerce!</Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            name="name"
            label="Name"
            placeholder="John Doe"
            onChange={handleChangeName}
            value={name}
            required
          />

          <Form.Input
            name="email"
            label="Email"
            placeholder="yourmail@mail.com"
            onChange={handleChangeEmail}
            value={email}
            required
          />

          <Form.Input
            name="password"
            label="Password"
            placeholder="*****"
            type="password"
            onChange={handleChangePassword}
            value={password}
            required
          />

          <Form.Group inline>
            <label>Gender</label>
            <Form.Radio
              label="Male"
              value="male"
              checked={gender === "male"}
              onChange={handleChangeGender}
            />
            <Form.Radio
              label="Female"
              value="female"
              checked={gender === "female"}
              onChange={handleChangeGender}
            />
            <Form.Radio
              label="Other"
              value="other"
              checked={gender === "other"}
              onChange={handleChangeGender}
            />
          </Form.Group>

          <Form.Input
            name="phone-number"
            label="Phone Number"
            placeholder="123-456-7890"
            onChange={handleChangePhoneNumber}
            value={phoneNumber}
            required
          />

          <Form.Input
            name="shipping-address"
            label="Shipping Address"
            placeholder="123 Main St, Anytown, USA"
            onChange={handleChangeShippingAddress}
            value={shippingAddress}
            required
          />

          {error && (
            <Label basic size="large" color="red" prompt>
              {error}
            </Label>
          )}

          <Button color="teal" fluid type="submit">
            Sign in
          </Button>
        </Form>
      </Card.Content>
    </Card>
  );

  return view;
}
