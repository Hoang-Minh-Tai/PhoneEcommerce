import React, { useContext, useState } from "react";
import {
  Card,
  Image,
  Header,
  Label,
  Button,
  Modal,
  Confirm,
} from "semantic-ui-react";
import ProductDetail from "./ProductDetail";
import ImageResizer from "react-image-resizer";
import Context from "../config/context";
import ConfirmDelete from "./ConfirmationBox";

export default function Product(props) {
  const { product } = props;
  const discount = product.discount.discount;
  const { deleteProduct } = useContext(Context);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleCardClick = (productId) => {
    // Open the modal and set the productId in the state
    if (!modalOpen) setModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setModalOpen(false);
  };

  const colorArray = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "teal",
    "grey",
  ];

  // Function to get the color based on the product id
  const getColorBasedOnId = (id) => {
    // Return the color from the colorArray based on the id
    return colorArray[id % colorArray.length];
  };

  // Get the color based on the id of the product
  const brandColor = getColorBasedOnId(product.category.id);
  const pic = product.imageUrl
    ? product.imageUrl
    : "https://media.idownloadblog.com/wp-content/uploads/2022/09/iPhone-14-and-iPhone-14-pro-wallpaper-idownloadblog-mock-up.png";

  return (
    <Card key={product.id} onClick={() => handleCardClick(product.id)}>
      <div className="product-container">
        <ImageResizer src={pic} width={300} height={300}></ImageResizer>
      </div>
      <Label color={brandColor} size="large" attached="top left">
        {product.brand.toUpperCase()}
      </Label>
      <Card.Content>
        <Card.Header>
          <Header floated="left">{product.model}</Header>
          <Header floated="right" color="teal">
            ${(product.price * (100 - discount)) / 100}
          </Header>
        </Card.Header>
        <Card.Description>{product.description}</Card.Description>
      </Card.Content>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        className="custom-modal"
      >
        {/* Render product detail content */}
        <Modal.Header className="modal-header">{product.brand}</Modal.Header>
        <Modal.Content image>
          <Modal.Description className="modal-description">
            <ProductDetail
              setModalOpen={setModalOpen}
              setDeleteModalOpen={setDeleteModalOpen}
              product={product}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
      <ConfirmDelete
        open={deleteModalOpen}
        name={product.model}
        onDelete={async () => {
          await deleteProduct(product.id);
          alert("delete product successfully!");
          setModalOpen(false);
          setDeleteModalOpen(false);
        }}
        onClose={() => setDeleteModalOpen(false)}
      />
    </Card>
  );
}
