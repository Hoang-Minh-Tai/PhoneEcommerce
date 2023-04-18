import React, { useContext,useState  } from "react";
import { Card, Image, Header, Label, Grid,Modal, Container  } from "semantic-ui-react";
import './product.css'
import Detail from "./Detail";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar,faStarHalfAlt  } from '@fortawesome/free-solid-svg-icons';
import ImageResizer from 'react-image-resizer';
import Context from "../config/context";

export default function Product(props) {
  const context = useContext(Context);
  const { user } = context;
  const [modalOpen, setModalOpen] = useState(false); // State to control modal open/close

  const handleCardClick = (productId) => {
    // Open the modal and set the productId in the state
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setModalOpen(false);
  };
  const pic = props.product.imageUrl
    ? props.product.imageUrl
    : "https://media.idownloadblog.com/wp-content/uploads/2022/09/iPhone-14-and-iPhone-14-pro-wallpaper-idownloadblog-mock-up.png";

  const extra = user ? (
    <Card.Content extra>
      <Detail product={props.product} />
    </Card.Content>
  ) : null;
  const [quantity, setQuantity] = useState(1); // State for quantity selection

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value)); // Update quantity state with selected value
  };

  const handleAddToCart = () => {
    // Implement logic to add product to cart with selected quantity
    // You can use the "quantity" state value in this function
    console.log("Product ID:", props.product.id);
    console.log("Quantity:", quantity);
  };
  return (
    <Card key={props.product.id} onClick={() => handleCardClick(props.product.id)}>
      <div className="product-container">
      <ImageResizer
        src={pic}
        width={250} // desired width in pixels
        height={200} // desired height in pixels
      />
      </div>
      <Label color="teal" size="large" attached="top left">
      {props.product.brand.toUpperCase()}
      </Label>
      <Card.Content>
        <Card.Header>
          <Header floated="left">{props.product.name}</Header>
          <Header floated="right" color="teal">
            ${props.product.price}
          </Header>
        </Card.Header>
        <Card.Description>{props.product.description}</Card.Description>
      </Card.Content>
      {extra}
      <Modal open={modalOpen} onClose={handleCloseModal} className="custom-modal">
      {/* Render product detail content */}
      <Modal.Header className="modal-header">{props.product.brand}</Modal.Header>
      <Modal.Content image>
        <Modal.Description className="modal-description">
        <div class = "card-wrapper">
      <div class = "card">
        <div class = "product-imgs">
          <div class = "img-display">
            <div class = "img-showcase">
            <ImageResizer
                src={pic}
                width={500} // desired width in pixels
                height={700} // desired height in pixels
              />
            </div>
          </div>
          
        </div>
        <div class = "product-content">
          <h2 class = "product-title">{props.product.model}</h2>
          <div class = "product-rating">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalfAlt} />
            <i class = "fas fa-star-half-alt"></i>
            <span>4.7(21)</span>
          </div>

          <div class = "product-price">
            <p class = "last-price">Old Price: <span>${(props.product.price* 1.05).toFixed()}</span></p>
            <p class = "new-price">New Price: <span>${props.product.price} (5%)</span></p>
          </div>

          <div class = "product-detail">
            <h2>about this item: </h2>
            <p>{props.product.description}</p>
            <ul>
              <li>Color: <span>Black</span></li>
              <li>Available: <span>in stock</span></li>
              <li>Memory: <span>{props.product.memoryVersion}</span></li>
              <li>Category: <span>{props.product.brand}</span></li>
              <li>Shipping Area: <span>All over the world</span></li>
              <li>Shipping Fee: <span>Free</span></li>
            </ul>
          <div class = "purchase-info">
                {props.product.inStock ? (
                  <>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min={1}
                      max={10}
                      className="quantity-input"
                      />
                      <button type = "button" class = "btn" onClick={handleAddToCart}>
                    Add to Cart <i class = "fas fa-shopping-cart"></i>
                  </button>
                  </>
                ) : (
                  <p className="out-of-stock">Out of Stock</p>
                  )}
                {/* Add other product detail data */}
            </div>
          </div>
        </div>
      </div>
    </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    </Card>
  );
}
