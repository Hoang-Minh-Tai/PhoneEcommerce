import React, { useContext, useState } from "react";

import { Form, Modal, Button } from "semantic-ui-react";

import Context from "../config/context";

export default function AddCategoryForm() {
  const context = useContext(Context);
  const { addCategory } = context;

  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");

  const handleChange1 = (e, { value }) => setName(value);
  const handleChange2 = (e, { value }) => setPicture(value);
  const handleChange3 = (e, { value }) => setDescription(value);

  const handleSubmit = () => {
    const category = {
      name: name,
      picture: picture,
      description: description,
    };

    addCategory(category);
  };

  return (
    <Modal
      trigger={
        <Button fluid primary>
          Add new Category
        </Button>
      }
    >
      <Modal.Header>Add new Category</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            name="name"
            label="Name"
            placeholder="Category name"
            onChange={handleChange1}
            value={name.value}
          />
          <Form.Input
            name="image"
            label="Image"
            placeholder="Image URL"
            onChange={handleChange2}
            value={picture.value}
          />
          <Form.Input
            name="description"
            label="description"
            placeholder="Category Description"
            onChange={handleChange3}
            value={picture.value}
          />
          <Form.Field>
            <label>Upload Image</label>
            <input type="file" accept="image/*" />
          </Form.Field>
          <Button type="submit">Add</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
