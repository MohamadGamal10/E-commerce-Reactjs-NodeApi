import React from "react";
import SubTitle from "../Uitily/SubTitle";
import { Container, Row, Spinner } from "react-bootstrap";
import CategoryCard from "../Category/CategoryCard";
// import clothe from "../../Images/clothe.png";
// import cat2 from "../../Images/cat2.png";
// import labtop from "../../Images/labtop.png";
// import sale from "../../Images/sale.png";
// import pic from "../../Images/pic.png";
import HomeCategoryHook from "../../hook/category/home-category-hook";

export default function HomeCategory() {

  const [categories , loading , colors] = HomeCategoryHook();

  return (
    <Container>
      <SubTitle title="التصنيفات" btnTitle={"المزيد"} pathText="allcategory" />
      <Row className="my-2 d-flex justify-content-between">
        {loading ? <Spinner animation="border" variant="primary" /> : categories ? (
          categories.data.slice(0, 5).map((category, index) => (
            <CategoryCard
            key={index}
              title={category.name}
              img={category.image}
              background={colors[Math.floor(Math.random() * 5) + 1]}
              id={category._id}
            />
          ))
        ) : (
          <h4>لا يوجد تصنيفات</h4>
        )}

        {/* <CategoryCard title="اجهزة منزلية" img={cat2} background="#F4DBA4" />
        <CategoryCard title="اجهزة منزلية" img={labtop} background="#0034FF" />
        <CategoryCard title="اجهزة منزلية" img={sale} background="#F4DBA4" />
        <CategoryCard title="اجهزة منزلية" img={clothe} background="#FF6262" />
        <CategoryCard title="اجهزة منزلية" img={pic} background="#F4DBA4" /> */}
      </Row>
    </Container>
  );
}
