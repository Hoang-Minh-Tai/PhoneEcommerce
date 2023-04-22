import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Footer from "./pages/Footer";
import ContextConnector from "./config/connector";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import ShoppingCart from "./pages/ShoppingCart";
import Orders from "./pages/Orders";

function App() {
  return (
    <ContextConnector>
      <Router>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signin} />
            <Route exact path="/cart" component={ShoppingCart} />
            <Route exact path="/orders" component={Orders} />
        </Switch>
        <Footer/>
      </Router>
    </ContextConnector>
  );
}

export default App;
