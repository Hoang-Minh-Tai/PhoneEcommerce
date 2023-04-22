import React from "react";
import { Card, Image, Label } from "semantic-ui-react";
import ImageResizer from "react-image-resizer";

export default function Category(props) {
  const pic = props.category.picture
    ? props.category.picture
    : "https://media.idownloadblog.com/wp-content/uploads/2022/09/iPhone-14-and-iPhone-14-pro-wallpaper-idownloadblog-mock-up.png";

  return (
    <div className="category-container">
      <Card color="teal" style={{ width: "450px", height: "auto" }}>
        <div className="product-container">
          <div className="product-image-container">
            <Image src={pic} className="product-image"/>
          </div>
        </div>
        <Card.Content>
          <Card.Header>{props.category.name}</Card.Header>
        </Card.Content>
      </Card>
    </div>
  );
}
