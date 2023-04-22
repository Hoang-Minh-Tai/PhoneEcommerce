import React, { useContext, useState } from "react";
import { Card, Image, Header, Label, Button, Modal } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import ImageResizer from "react-image-resizer";
import randomcolor from 'randomcolor';
import Context from "../config/context";
import Detail from "./Detail";
export default function Product(props) {
  const { product } = props;
  const discount = 0;
  const context = useContext(Context);
  const { user, addToCart } = context;
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleCardClick = (productId) => {
    // Open the modal and set the productId in the state
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setModalOpen(false);
  };
  
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value)); // Update quantity state with selected value
  };
  const colorArray = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "teal", "grey"];

  // Function to get the color based on the product id
  const getColorBasedOnId = (id) => {
    console.log(id)
    // Return the color from the colorArray based on the id
    return colorArray[id % colorArray.length];
  };

  // Get the color based on the id of the product
  const brandColor = getColorBasedOnId(product.category.id);
  const pic = product.imageUrl
    ? product.imageUrl
    : "https://media.idownloadblog.com/wp-content/uploads/2022/09/iPhone-14-and-iPhone-14-pro-wallpaper-idownloadblog-mock-up.png";

  const handleAddToCart = () => {
    // Implement logic to add product to cart with selected quantity
    // You can use the "quantity" state value in this function
    console.log("Product ID:", product.id);
    console.log("Quantity:", quantity);
    addToCart(product.id, quantity);
    setModalOpen(false);
  };

  return (
    <Card key={product.id} onClick={() => handleCardClick(product.id)}>
      <div className="product-container">
        <div className="product-image-container">
          <Image src={pic} className="product-image"/>
        </div>
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
            <Detail setModalOpen = {setModalOpen} product = {product}/>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </Card>
  );
}
