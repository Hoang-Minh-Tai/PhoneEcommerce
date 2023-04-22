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
            <div className="card-wrapper">
              <div className="card">
                <div className="product-imgs">
                  <div className="img-display">
                    <div className="img-showcase">
                      <ImageResizer
                        src={pic}
                        width={500} // desired width in pixels
                        height={700} // desired height in pixels
                      />
                    </div>
                  </div>
                </div>
                <div className="product-content">
                  <h2 className="product-title">{product.model}</h2>
                  <div className="product-rating">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalfAlt} />
                    <i className="fas fa-star-half-alt"></i>
                    <span>4.7(21)</span>
                  </div>

                  <div className="product-price">
                    <p className="last-price">
                      Old Price: <span>${product.price.toFixed()}</span>
                    </p>
                    <p className="new-price">
                      New Price:{" "}
                      <span>
                        ${(product.price * (100 - discount)) / 100} ({discount}
                        %)
                      </span>
                    </p>
                  </div>

                  <div className="product-detail">
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
                        Category: <span>{product.category.name}</span>
                      </li>
                      <li>
                        Shipping Area: <span>All over the world</span>
                      </li>
                      <li>
                        Shipping Fee: <span>Free</span>
                      </li>
                    </ul>
                    <div className="purchase-info">
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
                            className="btn"
                            onClick={handleAddToCart}
                          >
                            Add to Cart <i className="fas fa-shopping-cart"></i>
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
