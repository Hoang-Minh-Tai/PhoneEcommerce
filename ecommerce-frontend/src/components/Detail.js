import React, { useContext, useState } from "react";
import { Card, Image, Header, Label, Button, Modal } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import ImageResizer from "react-image-resizer";
import Context from "../config/context";

export default function Detail(props) {
  const { product ,setModalOpen} = props;
  const discount = 0;
  const context = useContext(Context);
  const { user, addToCart } = context;
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value)); // Update quantity state with selected value
  };

  const pic = product.imageUrl
    ? product.imageUrl
    : "https://media.idownloadblog.com/wp-content/uploads/2022/09/iPhone-14-and-iPhone-14-pro-wallpaper-idownloadblog-mock-up.png";

  const handleAddToCart  = async() => {
    // Implement logic to add product to cart with selected quantity
    // You can use the "quantity" state value in this function
    console.log("Product ID:", product.id);
    console.log("Quantity:", quantity);
    const res_add_card = await addToCart(product.id, quantity);
    if (res_add_card === 201) {
        setModalOpen(false);
        // If response status code is 201, show success message
        alert("Add to cart success!");
      } else {
        // If response status code is not 201, show error message
        alert("Failed to add to cart!");
      }

  };
  return (
            <>
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
                        Category: <span>{product.brand}</span>
                      </li>
                      <li>
                        Shipping Area: <span>All over the world</span>
                      </li>
                      <li>
                        Shipping Fee: <span>Free</span>
                      </li>
                    </ul>
                    
                    {user && user.role !== "ADMIN"?(
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
                      ):(<></>)}

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
            
            </>
          
  );
}

