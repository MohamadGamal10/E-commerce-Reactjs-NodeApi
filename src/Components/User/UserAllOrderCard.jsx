import React from "react";
import { Row, Col } from "react-bootstrap";
import mobile from "../../Images/mobile.png";
import { backUrl } from "../../Api/BaseUrl";
import { Link } from "react-router-dom";

export default function UserAllOrderCard({ item }) {
  console.log(item);
  return (
    <div>
      <Row className="d-flex mb-2">
        <Col xs="3" md="2" className="d-flex justify-content-start">
          <Link
            to={`/products/${item.product._id}`}
            style={{ textDecoration: "none" }}
          >
            <img
              width="93px"
              height="120px"
              src={`${
                item.product.imageCover
                  ? `${backUrl}/products/${item.product.imageCover}`
                  : mobile
              }`}
              alt="img"
            />
          </Link>
        </Col>
        <Col xs="8" md="6">
          <div className="d-inline pt-2 cat-title">{item.product.title}</div>
          <div className="d-inline pt-2 cat-rate me-2">
            {item.product.ratingsAverage || 0}
          </div>
          <div className="rate-count d-inline p-1 pt-2">
            ({item.product.ratingsQuantity || 0} تقييم)
          </div>
          <div className="mt-3 d-flex">
            <div className="cat-text  d-inline">الكميه</div>
            <input
              className="mx-2 "
              type="number"
              value={item.count}
              style={{ width: "40px", height: "25px" }}
            />
            <div
              className="color ms-2"
              style={{ backgroundColor: item.color }}
            ></div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
