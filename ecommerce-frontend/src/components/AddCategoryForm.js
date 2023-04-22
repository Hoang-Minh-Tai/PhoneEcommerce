import React, { useContext, useState } from "react";

import { Form, Modal, Button } from "semantic-ui-react";

import Context from "../config/context";

export default function AddCategoryForm(props) {
  const context = useContext(Context);
  const { addCategory, updateCategory } = context;
  const { category } = props;

  const [name, setName] = useState(category ? category.name : "");
  const [picture, setPicture] = useState(category ? category.picture : "");
  const [description, setDescription] = useState(
    category ? category.description : ""
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleChange1 = (e, { value }) => setName(value);
  const handleChange2 = (e, { value }) => setPicture(value);
  const handleChange3 = (e, { value }) => setDescription(value);

  const handleSubmit = () => {
    const newCategory = {
      name: name,
      picture: picture,
      description: description,
    };

    if (category) {
      updateCategory(category.id, newCategory);
    } else addCategory(newCategory);

    setIsOpen(false); // Close the modal after submitting
  };

  return (
    <Modal
      open={isOpen}
      trigger={
        <Button fluid primary onClick={() => setIsOpen(true)}>
          {category ? "Update Category" : "Add new Category"}
        </Button>
      }
      onClose={() => setIsOpen(false)}
    >
      <Modal.Header>
        {category ? "Update Category" : "Add new Category"}
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            name="name"
            label="Name"
            placeholder="Category name"
            onChange={handleChange1}
            value={name}
            required
          />
          <Form.Input
            name="image"
            label="Image"
            placeholder="Image URL"
            onChange={handleChange2}
            value={picture}
            required
          />
          <Form.Input
            name="description"
            label="description"
            placeholder="Category Description"
            onChange={handleChange3}
            value={description}
            required
          />
          <Form.Field>
            <label>Upload Image</label>
            <input type="file" accept="image/*" />
          </Form.Field>
          <Button type="submit"> {category ? "Update" : "Add"}</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
