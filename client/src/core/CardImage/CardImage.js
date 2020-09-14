import React from "react";
import './CardImage.css';

const API = process.env.REACT_APP_SERVER_URL;


const ImageHelper = ({ product }) => {
  const imageurl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
      <img
        src={imageurl}
        alt="product"
        className='cardImage'
      />
  );
};

export default ImageHelper;