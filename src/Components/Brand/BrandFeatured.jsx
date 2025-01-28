import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import BrandCard from "./BrandCard";
// import brand1 from "../../Images/brand1.png";
// import brand2 from "../../Images/brand2.png";
// import brand3 from "../../Images/brand3.png";
import SubTitle from "../Uitily/SubTitle";
import HomeBrandHook from "../../hook/brand/home-brand-hook";
export default function BrandFeatured({ title, btnTitle }) {
 

const [brand , loading] = HomeBrandHook();
  
  return (
    <Container>
      <SubTitle title={title} btnTitle={btnTitle} pathText={"allbrand"}/>
      <Row className="my-2 d-flex justify-content-between">
        {/* <BrandCard img={brand1} /> */}

        {loading ? <Spinner animation="border" variant="primary" /> : brand && brand.data.length > 0 ? (
          brand.data.slice(0, 5).map((brand, index) => (
            <BrandCard key={index} id={brand._id} img={brand.image} />
          ))
        ) : (
          <h4>لا يوجد ماركات</h4>
        )}

        {/* <BrandCard img={brand2} />
        <BrandCard img={brand3} />
        <BrandCard img={brand2} />
        <BrandCard img={brand1} />
        <BrandCard img={brand3} /> */}
      </Row>
    </Container>
  );
}
