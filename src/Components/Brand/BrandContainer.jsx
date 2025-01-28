import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import BrandCard from "./BrandCard";
// import brand1 from "../../Images/brand1.png";
// import brand2 from "../../Images/brand2.png";
// import brand3 from "../../Images/brand3.png";
import SubTitle from "../Uitily/SubTitle";

export default function BrandContainer({ brand , loading }) {
  return (
    <Container>
      <SubTitle title={"كل الماركات"} />
      <Row className="my-2 d-flex justify-content-between">
        {loading === false ? (
          brand.data ? (
            brand.data.map((item, index) => {
              return <BrandCard id={item._id} key={index} img={item.image} />;
            })
          ) : (
            <h4>لا يوجد ماركات</h4>
          )
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
        {/* <BrandCard img={brand1} />
        <BrandCard img={brand2} />
        <BrandCard img={brand3} />
        <BrandCard img={brand2} />
        <BrandCard img={brand1} />
        <BrandCard img={brand3} />
        <BrandCard img={brand1} />
        <BrandCard img={brand2} />
        <BrandCard img={brand3} />
        <BrandCard img={brand2} />
        <BrandCard img={brand1} />
        <BrandCard img={brand3} />
        <BrandCard img={brand1} />
        <BrandCard img={brand2} />
        <BrandCard img={brand3} />
        <BrandCard img={brand2} />
        <BrandCard img={brand1} />
        <BrandCard img={brand3} /> */}
      </Row>
    </Container>
  );
}
