import React, { useContext, useState, useEffect } from "react";

import { Form, Modal, Button, Header, Dropdown } from "semantic-ui-react";

import Context from "../config/context";

export default function AddProductForm() {
  const context = useContext(Context);
  const { categories, getCategories, addProduct } = context;

  useEffect(() => {
    getCategories();
  }, []);

  const listCategories = categories.map((category) => ({
    key: category.id,
    text: category.name,
    value: category.id,
  }));

  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [memoryVersion, setMemoryVersion] = useState("");
  const [inStock, setInStock] = useState(true);
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");

  const handleChange1 = (e, { value }) => setModel(value);
  const handleChange2 = (e, { value }) => setBrand(value);
  const handleChange3 = (e, { value }) => setDescription(value);
  const handleChange4 = (e, { value }) => setPrice(value);
  const handleChange5 = (e, { value }) => setImageUrl(value);
  const handleChange6 = (e, { value }) => setMemoryVersion(value);
  const handleChange7 = (e, { value }) => setInStock(value);
  const handleChange8 = (e, { value }) => setCategory(value);
  const handleChange9 = (e, { value }) => setDiscount(value);

  const handleSubmit = () => {
    const product = {
      model: model,
      brand: brand,
      description: description,
      price: parseFloat(price),
      imageUrl: imageUrl,
      memoryVersion: memoryVersion,
      inStock: inStock,
      categoryId: parseInt(category),
      discount: parseFloat(discount),
    };

    addProduct(product);
  };

  return (
    <Modal
      trigger={
        <Button primary fluid>
          Add new Product
        </Button>
      }
    >
      <Modal.Header>Add new Product</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              name="model"
              label="Model"
              placeholder="Product model"
              onChange={handleChange1}
              value={model}
            />
            <Form.Input
              name="brand"
              label="Brand"
              placeholder="Product brand"
              onChange={handleChange2}
              value={brand}
            />
          </Form.Group>
          <Form.Field>
            <Header as="h5">Category</Header>
            <Dropdown
              name="category"
              placeholder="Category"
              fluid
              selection
              options={listCategories}
              onChange={handleChange8}
              value={category.value}
            />
          </Form.Field>
          <Form.Input
            name="description"
            label="Description"
            placeholder="Product description"
            onChange={handleChange3}
            value={description}
          />
          <Form.Input
            name="discount"
            label="Discount"
            placeholder="Discount"
            type="number"
            min="0"
            max="100"
            onChange={handleChange9}
            value={discount}
          />
          <Form.Group widths="equal">
            <Form.Input
              name="price"
              label="Price"
              placeholder="Price (USD)"
              onChange={handleChange4}
              value={price}
            />
            <Form.Input
              name="imageUrl"
              label="Image URL"
              placeholder="Image URL"
              onChange={handleChange5}
              value={imageUrl}
            />
          </Form.Group>
          <Form.Input
            name="memoryVersion"
            label="Memory Version"
            placeholder="Memory Version"
            onChange={handleChange6}
            value={memoryVersion}
          />
          <Form.Group inline>
            <label>In Stock:</label>
            <Form.Radio
              name="inStock"
              label="True"
              value="true"
              checked={inStock === true}
              onChange={() => setInStock(true)}
            />
            <Form.Radio
              name="inStock"
              label="False"
              value="false"
              checked={inStock === false}
              onChange={() => setInStock(false)}
            />
          </Form.Group>
          <Button type="submit">Add</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
