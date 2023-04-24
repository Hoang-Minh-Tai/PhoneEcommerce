import React, { useContext, useState, useEffect } from "react";

import { Form, Modal, Button, Header, Dropdown } from "semantic-ui-react";

import Context from "../config/context";

export default function AddProductForm(props) {
  const context = useContext(Context);
  const { categories, getCategories, addProduct, updateProduct } = context;
  const { product } = props;

  useEffect(() => {
    getCategories();
  }, []);

  const listCategories = categories.map((category) => ({
    key: category.id,
    text: category.name,
    value: category.id,
  }));

  const [modalOpen, setModalOpen] = useState(false);
  const [model, setModel] = useState(product ? product.model : "");
  const [brand, setBrand] = useState(product ? product.brand : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [price, setPrice] = useState(product ? product.price : 0);
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : "");
  const [memoryVersion, setMemoryVersion] = useState(
    product ? product.memoryVersion : ""
  );
  const [inStock, setInStock] = useState(product ? product.inStock : true);
  const [category, setCategory] = useState(product ? product.category : "");
  const [discount, setDiscount] = useState(
    product ? product.discount.discount : 0
  );

  const handleChange1 = (e, { value }) => setModel(value);
  const handleChange2 = (e, { value }) => setBrand(value);
  const handleChange3 = (e, { value }) => setDescription(value);
  const handleChange4 = (e, { value }) => setPrice(value);
  const handleChange5 = (e, { value }) => setImageUrl(value);
  const handleChange6 = (e, { value }) => setMemoryVersion(value);
  const handleChange7 = (e, { value }) => setInStock(value);
  const handleChange8 = (e, { value }) => setCategory(value);
  const handleChange9 = (e, { value }) => setDiscount(value);

  const handleSubmit = async () => {
    const newProduct = {
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

    console.log("category value", category);

    if (product) {
      await updateProduct(product.id, newProduct);
      setModalOpen(false);
      alert("Update product successfully!");
    } else {
      await addProduct(newProduct);
      setModalOpen(false);
      alert("Add product successfully!");
    }
  };

  return (
    <Modal
      trigger={
        <Button
          primary
          fluid={props.size ? false : true}
          size={props.size || "large"}
          onClick={() => setModalOpen(true)}
        >
          {product ? "Update Product" : "Add new Product"}
        </Button>
      }
      open={modalOpen}
    >
      <Modal.Header>
        {product ? "Update Product" : "Add new Product"}
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              name="model"
              label="Model"
              placeholder="Product model"
              onChange={handleChange1}
              value={model}
              required
            />
            <Form.Input
              name="brand"
              label="Brand"
              placeholder="Product brand"
              onChange={handleChange2}
              value={brand}
              required
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
              value={category.id}
              required
            />
          </Form.Field>
          <Form.Input
            name="description"
            label="Description"
            placeholder="Product description"
            onChange={handleChange3}
            value={description}
            required
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
              required
            />
            <Form.Input
              name="imageUrl"
              label="Image URL"
              placeholder="Image URL"
              onChange={handleChange5}
              value={imageUrl}
              required
            />
          </Form.Group>
          <Form.Input
            name="memoryVersion"
            label="Memory Version"
            placeholder="Memory Version"
            onChange={handleChange6}
            value={memoryVersion}
            required
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
          <Button type="submit">{product ? "Update" : "Add"}</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
