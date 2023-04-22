import React, { useContext, useState, useEffect } from "react";
import { Grid, Card, Segment } from "semantic-ui-react";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import AddProductForm from "../components/AddProductForm";

import Context from "../config/context";
const Home = () => {
  const context = useContext(Context);
  const { user, products, getProducts } = context;
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);

  useEffect(() => {
    getProducts();
  }, []);

  // Get current products

  const views =
    products.length > 0 ? (
      products.slice(0, 4).map((product) => <Product product={product} />)
    ) : (
      <Card>
        <Card.Content>
          <h2>Nothing here!</h2>
        </Card.Content>
      </Card>
    );

  const add = user ? user.admin ? <AddProductForm /> : null : null;
  return (
    <div>
      <div className="HeroContainer">
        <div className="container HeroContent">
          <div>
            <section>
              <div className="wrapper two">
                <div className="neon">
                  <h1>Shop with us because you’re worth it!</h1>
                </div>
              </div>
              <h3 className="RegularText" size="l" color="subtitle">
                Let us take care of all your shopping needs!
              </h3>
            </section>
          </div>

          {/* <div className="imageContainer">
            <img src={heroImage} alt="" />
          </div> */}
        </div>
      </div>
      <div className="productsBar">
        <h1>New Arrival</h1>
        <br />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="cardDisplay">
          <Card.Group fluid itemsPerRow="4">
            {views}
          </Card.Group>
        </div>
      </div>
      <br />
      <div
        className="buttonWrapper"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <a href="/products">
          <button class="button-33">See All</button>
        </a>
      </div>
      <br />

      {/* Section People talk about */}
      <div className="HeroContainer"></div>
    </div>
  );
};

export default Home;
