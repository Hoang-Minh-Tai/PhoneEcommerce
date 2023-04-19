import React, { useContext, useState } from "react";
import { Card, Image, Header, Label, Button, Modal } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import ImageResizer from "react-image-resizer";
import Context from "../config/context";

export default function Product(props) {
  const { product } = props;
  const discount = product.discount.discount;
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
        <Image src={pic} fluid />
      </div>
      <Label color="teal" size="large" attached="top left">
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
            <div class="card-wrapper">
              <div class="card">
                <div class="product-imgs">
                  <div class="img-display">
                    <div class="img-showcase">
                      <ImageResizer
                        src={pic}
                        width={500} // desired width in pixels
                        height={700} // desired height in pixels
                      />
                    </div>
                  </div>
                </div>
                <div class="product-content">
                  <h2 class="product-title">{product.model}</h2>
                  <div class="product-rating">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                    <i class="fas fa-star-half-alt"></i>
                    <span>4.7(21)</span>
                  </div>

                  <div class="product-price">
                    <p class="last-price">
                      Old Price: <span>${product.price.toFixed()}</span>
                    </p>
                    <p class="new-price">
                      New Price:{" "}
                      <span>
                        ${(product.price * (100 - discount)) / 100} ({discount}
                        %)
                      </span>
                    </p>
                  </div>

                  <div class="product-detail">
                    <h2>about this item: </h2>
                    <p>{product.description}</p>
                    <ul>
                      <li>
                        Color: <span>Black</span>
                      </li>
                      <li>
                        Available: <span>in stock</span>
                      </li>
                      <li>
                        Memory: <span>{product.memoryVersion}</span>
                      </li>
                      <li>
                        Category: <span>{product.brand}</span>
                      </li>
                      <li>
                        Shipping Area: <span>All over the world</span>
                      </li>
                      <li>
                        Shipping Fee: <span>Free</span>
                      </li>
                    </ul>
                    <div class="purchase-info">
                      {product.inStock ? (
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
                          <button
                            type="button"
                            class="btn"
                            onClick={handleAddToCart}
                          >
                            Add to Cart <i class="fas fa-shopping-cart"></i>
                          </button>
                        </>
                      ) : (
                        <p className="out-of-stock">Out of Stock</p>
                      )}
                    </div>
                    {user && user.role === "ADMIN" && (
                      <>
                        <Button color="blue">Update Product</Button>
                        <Button color="red">Delete Product</Button>
                      </>
                    )}
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
