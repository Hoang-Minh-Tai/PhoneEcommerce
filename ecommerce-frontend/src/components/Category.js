import React, { useContext } from "react";
import { Card, Image, Label, Button } from "semantic-ui-react";
import ImageResizer from "react-image-resizer";
import Context from "../config/context";
import AddCategoryForm from "./AddCategoryForm";
import { Link } from "react-router-dom";

export default function Category(props) {
  const { user, deleteCategory } = useContext(Context);

  const pic = props.category.picture
    ? props.category.picture
    : "https://media.idownloadblog.com/wp-content/uploads/2022/09/iPhone-14-and-iPhone-14-pro-wallpaper-idownloadblog-mock-up.png";

  const update = user ? (
    user.role === "ADMIN" ? (
      <>
        <AddCategoryForm category={props.category} />
        <Button
          fluid
          color="red"
          onClick={() => {
            deleteCategory(props.category.id);
          }}
        >
          Delete
        </Button>
      </>
    ) : null
  ) : null;

  return (
    <div className="category-container">
      <Card color="teal" style={{ width: "450px", height: "auto" }}>
        <Link to={`/products?category=${props.category.name}`}>
          <ImageResizer src={pic} width={450} height={400} />
        </Link>
        <Card.Content>
          <Card.Header>{props.category.name}</Card.Header>

          {update}
        </Card.Content>
      </Card>
    </div>
  );
}
