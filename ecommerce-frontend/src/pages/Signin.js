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

  const handleSubmit = async () => {
    const newUser = {
      username: name,
      email: email,
      password: password,
      gender: gender.toUpperCase(),
      phone_number: phoneNumber,
      shipping_address: shippingAddress,
      is_admin: false,
    };

    const response = await addUser(newUser);
    setError(response.message);
  };

  const view = user ? (
    <Redirect to="/" />
  ) : (
    <Card fluid>
      <Card.Content>
        <Header textAlign="center">Welcome to eCommerce!</Header>
        {error && (
          <Header textAlign="center" style={{ color: "red", fontSize: "14px" }}>
            {error}
          </Header>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Input
            name="name"
            label="Name"
            placeholder="username"
            onChange={handleChangeName}
            value={name}
            required
          />

          <Form.Input
            name="email"
            label="Email"
            type="email"
            placeholder="yourmail@mail.com"
            onChange={handleChangeEmail}
            value={email}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
          />

          <Form.Input
            name="password"
            label="Password"
            placeholder="*****"
            type="password"
            onChange={handleChangePassword}
            value={password}
            minLength={8}
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
            minLength={8}
            pattern="^\d{0,10}$"
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

          <Button color="teal" fluid type="submit">
            Sign in
          </Button>
        </Form>
      </Card.Content>
    </Card>
  );

  return view;
}
