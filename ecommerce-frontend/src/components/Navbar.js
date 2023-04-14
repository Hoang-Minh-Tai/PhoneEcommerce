import React, { useContext, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Context from "../config/context";

export default function Navbar() {
  const context = useContext(Context);
  const { user, clearUser } = context;
  const [activeItem, setActiveItem] = useState("home");

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const handleLogout = () => {
    clearUser();
    setActiveItem("home");
  };

  const userInfo = user ? (
    <Menu.Menu position="right">
      <Menu.Item
        name="logout"
        active={activeItem === "logout"}
        onClick={handleLogout}
        as={Link}
        to="/"
      />
    </Menu.Menu>
  ) : (
    <Menu.Menu position="right">
      <Menu.Item
        name="login"
        active={activeItem === "login"}
        onClick={handleItemClick}
        as={Link}
        to="/login"
      />
      <Menu.Item
        name="signup"
        active={activeItem === "signup"}
        onClick={handleItemClick}
        as={Link}
        to="/signup"
      />
    </Menu.Menu>
  );

  return (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Item
        name="categories"
        active={activeItem === "categories"}
        onClick={handleItemClick}
        as={Link}
        to="/categories"
      />
      <Menu.Item
        name="products"
        active={activeItem === "products"}
        onClick={handleItemClick}
        as={Link}
        to="/products"
      />
      {user && (
        <Menu.Item
          name="ShoppingCart"
          active={activeItem === "ShoppingCart"}
          onClick={handleItemClick}
          as={Link}
          to="/cart"
        ></Menu.Item>
      )}
      {userInfo}
    </Menu>
  );
}
