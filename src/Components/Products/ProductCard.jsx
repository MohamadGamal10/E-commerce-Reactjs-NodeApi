import React, { useEffect, useState } from "react";
import rate from "../../Images/rate.png";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductCardHook from "../../hook/products/product-card-hook";
import { ToastContainer } from "react-toastify";
import { backUrl } from "../../Api/BaseUrl";
export default function ProductCard({ item, favProd }) {
  const [removeToWishListData, addToWishListData, handleFav, favImg] = ProductCardHook(item, favProd);

  return (
    <Col xs="6" sm="6" md="4" lg="3" className="d-flex ">
      <Card
        className="my-2"
        style={{
          width: "100%",
          height: "345px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 2px 2px 0 rgba(151,151,151,0.5)",
        }}
      >
        <Link to={`/products/${item._id}`} style={{ textDecoration: "none" }}>
          <Card.Img
            style={{ height: "228px", width: "100%" }}
            src={item.imageCover}
          />
        </Link>
        <div className="d-flex justify-content-end mx-2">
          <img
            src={favImg}
            alt="fav"
            onClick={handleFav}
            className="text-center"
            style={{
              height: "24px",
              width: "26px",
              cursor: "pointer",
            }}
          />
        </div>
        <Card.Body className="py-1 ">
          <Card.Title>
            <div className="card-title">{item.title}</div>
          </Card.Title>
          <Card.Text>
            <div className="d-flex justify-content-between ">
              <div className="d-flex">
                <img
                  className=""
                  src={rate}
                  alt=""
                  height="16px"
                  width="16px"
                />
                <div className="card-rate mx-2">{item.ratingsAverage || 0}</div>
              </div>
              <div className="d-flex">
                <div className="card-price">
                  {item.priceAfterDiscount ? (
                    <div>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "#9B9B9B",
                          fontSize: "17px",
                        }}
                      >
                        {item.price}
                      </span>
                      {item.priceAfterDiscount}
                    </div>
                  ) : (
                    item.price
                  )}
                </div>
                <div className="card-currency mx-1">جنيه</div>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
      <ToastContainer />
    </Col>
  );
}
