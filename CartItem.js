import React from "react";

const CartItem = (props) => {
  const { price, title, qty } = props.product;
  const {
    product,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onDeleteProduct
  } = props;
  return (
    <div className="cart-item">
      <div className="left-block">
        <img style={styles.image} src={product.img} />
      </div>
      <div className="right-block">
        <div style={{ fontSize: 25 }}>{title}</div>
        <div style={{ color: "#777" }}>Rs {price} </div>
        <div style={{ color: "#777" }}>Qty: {qty} </div>
        <div className="cart-item-actions">
          {/* Buttons */}
          <img
            alt="increase"
            className="action-icons"
            src="https://cdn-icons-png.flaticon.com/512/148/148781.png"
            onClick={() => onIncreaseQuantity(product)}
          />
          <img
            alt="decrease"
            className="action-icons"
            src="https://cdn-icons-png.flaticon.com/512/1828/1828779.png"
            onClick={() => onDecreaseQuantity(product)}
          />
          <img
            alt="delete"
            className="action-icons"
            src="https://cdn-icons.flaticon.com/png/512/3395/premium/3395538.png?token=exp=1659770809~hmac=9ba634e16919996fcc8235bd420930a2"
            onClick={() => onDeleteProduct(product.id)}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  image: {
    height: 100,
    width: 100,
    borderRadius: 4,
    background: "#ccc"
  }
};

export default CartItem;

