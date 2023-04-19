import React, { useContext, useState } from "react";

import "semantic-ui-css/semantic.min.css";
import { Card, Header, Form, Button, Label } from "semantic-ui-react";

import Context from "../config/context";
import { Redirect } from "react-router-dom";

export default function Login() {
  const { user, getUser } = useContext(Context);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange1 = (e, { value }) => setUsername({ value });
  const handleChange2 = (e, { value }) => setPassword({ value });

  const handleSubmit = async () => {
    const user = {
      username: username.value,
      password: password.value,
    };
    const data = await getUser(user);
    if (data == 401) {
      setError("The username and password you entered are not correct");
    }
  };

  const view = user ? (
    <Redirect to="/" />
  ) : (
    <Card fluid>
      <Card.Content>
        <Header textAlign="center">Login</Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            name="username"
            label="Username"
            placeholder="your username"
            onChange={handleChange1}
            value={username.value}
            required
          />
          <Form.Input
            name="password"
            label="Password"
            placeholder="*****"
            type="password"
            onChange={handleChange2}
            value={password.value}
            required
          />
          {error && (
            <Label basic size="large" color="red" prompt>
              {error}
            </Label>
          )}
          <Button color="teal" fluid type="submit">
            Login
          </Button>
        </Form>
      </Card.Content>
    </Card>
  );

  return view;
}
