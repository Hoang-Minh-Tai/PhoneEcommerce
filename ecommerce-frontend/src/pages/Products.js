import React, { useContext, useState, useEffect } from "react";

import { Grid, Card, Segment, Input } from "semantic-ui-react";

import Product from "../components/Product";
import Pagination from "../components/Pagination";
import AddProductForm from "../components/AddProductForm";
import Context from "../config/context";

export default function Products() {
  const context = useContext(Context);
  const { user, products, getProducts } = context;

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6);

  useEffect(() => {
    getProducts();
  }, []);

  // Get current products
  const indexOfLastProduct = currentPage * cardsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - cardsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const views =
    products.length > 0 ? (
      currentProducts.map((product, index) => <Product product={product} />)
    ) : (
      <Card>
        <Card.Content>
          <h2>Nothing here!</h2>
        </Card.Content>
      </Card>
    );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pagination =
    products.length > cardsPerPage ? (
      <Pagination
        cardsPerPage={cardsPerPage}
        totalCards={products.length}
        paginate={paginate}
      />
    ) : null;

  const add = user ? user.role == "ADMIN" ? <AddProductForm /> : null : null;

  return (
    <>
      <Segment>
        <Grid>
          <Grid.Column floated="left" width={5}>
            <h1>Recent Products</h1>
          </Grid.Column>
          <Grid.Column floated="right" width={5}>
            {add}
            <Input icon="search" placeholder="Search..." fluid />
          </Grid.Column>
        </Grid>
      </Segment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="products-wrapper">
          <Card.Group fluid itemsPerRow="3">
            {views}
          </Card.Group>
        </div>
      </div>
      <br />
      <center>{pagination}</center>
    </>
  );
}
