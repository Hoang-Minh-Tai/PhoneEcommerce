import React from "react";
import { Card, Image, Label } from "semantic-ui-react";
import ImageResizer from 'react-image-resizer';
import './Category.css'

export default function Category(props) {
  const pic = props.category.description
    ? props.category.description
    : "https://media.idownloadblog.com/wp-content/uploads/2022/09/iPhone-14-and-iPhone-14-pro-wallpaper-idownloadblog-mock-up.png";

  return (
    <div className="category-container">
    <Card color="teal" style={{ width: '450px', height: 'auto' }}>
    <ImageResizer
        src={pic}
        width={450} // desired width in pixels
        height={400} // desired height in pixels
      />
  <Card.Content>
    <Card.Header>{props.category.name}</Card.Header>
  </Card.Content>
</Card>
</div>
  );
}
