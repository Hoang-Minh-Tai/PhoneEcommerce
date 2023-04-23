import React, { useContext, useState } from "react";

import { NavLink } from "react-router-dom";
import { Menu, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
// import logo from "assets/coffe-delivery-logo.svg";
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
    <>
      <Menu pointing secondary size="massive" color="red">
        {/* <Menu.Item>
          <NavLink to="/">
            <Image src={logo} alt="Logo" size="mini" />
          </NavLink>
        </Menu.Item> */}
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
        {user && user.role !== "ADMIN" && (
          <>
            <Menu.Item
              name="ShoppingCart"
              active={activeItem === "ShoppingCart"}
              onClick={handleItemClick}
              as={Link}
              to="/cart"
            ></Menu.Item>
          </>
        )}
        {user && user.role === "ADMIN" && (
          <>
            <Menu.Item
              name="orders"
              active={activeItem === "orders"}
              onClick={handleItemClick}
              as={Link}
              to="/orders"
            ></Menu.Item>
            <Menu.Item
              name="vouchers"
              active={activeItem === "vouchers"}
              onClick={handleItemClick}
              as={Link}
              to="/vouchers"
            ></Menu.Item>
          </>
        )}
        {userInfo}
      </Menu>
    </>
  );
}
